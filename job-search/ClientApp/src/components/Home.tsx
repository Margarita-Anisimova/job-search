import * as React from 'react';
import { useState, useEffect } from 'react';
import '../custom.css';
import './Home.css';
import SearchInput from './SearchInput'
import { getVacancyCards, getResumeCards } from './cardsTemplate'
import { getEducationLevel, getWorkExperience, getWorkType } from './formElements'
import { getResumesByFilters, getVacanciesByFilters } from './baseconnect'
import { useSelector } from 'react-redux';
import { getDate } from '../exportFunctions';
import { ResumeInfoType, ResumeType, VacancyType } from './types';

export default function Home(props: { pageType: string }) {
  const defaultFilter = {
    profession_id: 1,
    word: '',
    city_id: 1,
    education_level: 'Нет образования',
    salary: '',
    work_experience: '',
    work_type: [false, false, false, false, false],
    isFilters: true,
  }

  const userState = useSelector((state: any) => state.userState.userState)
  const professionState = useSelector((state: any) => state.professionState.professionState)
  const cityState = useSelector((state: any) => state.cityState.cityState)
  const [isFilters, setFiltersStatus] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [filters, setFilters] = useState(defaultFilter)



  function filterChanged(e: any) {
    let a = e.target || e
    setFilters({ ...filters, [a.name]: a.value })
  }

  function professionChanged(value: number) {
    setFilters({ ...filters, profession_id: value })
  }

  function cityChanged(value: number) {
    setFilters({ ...filters, city_id: value })
  }

  function searchChanged(value: string) {
    setFilters({ ...filters, profession_id: 0 })
    setFilters({ ...filters, word: value })
  }

  function cityNull(value: string) {
    setcity(cityState[0].name);
    setFilters({ ...filters, city_id: 1 });
  }

  function confirm() {
    // if (filters.city_id == 0) {
    //   setFilters({ ...filters, city_id: 1 });
    // }
    let inputsearch = (document.querySelectorAll('.search__form--prof')[0] as HTMLInputElement).value;
    // if (filters.profession_id == 0) {
    //   setFilters({ ...filters, word: inputsearch })
    // }
    if (inputsearch) {
      setIsSearch(true);
      if (props.pageType === 'resumes') {
        getResumesByFilters(filters, setResumes)
      } else {
        getVacanciesByFilters(filters, setVacancies)
      }
    }
  }

  const [resumes, setResumes] = useState<any[]>([]);
  const [vacancies, setVacancies] = useState<any[]>([]);

  function getFilters() {
    return (
      <div>
        <div className='filters'>
          <label>Уровень образования</label>
          {getEducationLevel(filters.education_level, filterChanged)}

          <label>Зарплата</label>
          <input type='text' name='salary' onChange={(e) => filterChanged(e)} value={filters.salary} placeholder='От руб'></input>
          <label>Стаж работы в сфере</label>
          {getWorkExperience(filterChanged)}
          <label>График работы</label>
          {getWorkType(filters)}
        </div>
        <button className='light__button-dark' onClick={confirm}>Применить</button>
      </div>
    )
  }

  function openFilters() {
    setFiltersStatus(!isFilters);
    setFilters(defaultFilter);
  }

  function compare(a, b, c) {
    return a < b
      ? c
      : a > b
        ? -c
        : 0
  }

  function sorting(e) {
    let sortedvacancies: any[] = []
    let sortedresumes: any[] = []
    if (e.target.value == 'des salary') {
      if (props.pageType == 'vacancies') {
        sortedvacancies = vacancies.sort((a: VacancyType, b: VacancyType) => compare(parseInt(a.salary), parseInt(b.salary), 1)).slice()
      } else {
        sortedresumes = resumes.sort((a: ResumeInfoType, b: ResumeInfoType) => compare(parseInt(a.desired_salary), parseInt(b.desired_salary), 1)).slice()
      }
    } else if (e.target.value == 'asc salary') {
      if (props.pageType == 'vacancies') {
        sortedvacancies = vacancies.sort((a: VacancyType, b: VacancyType) => compare(parseInt(a.salary), parseInt(b.salary), -1)).slice()
      } else {
        sortedresumes = resumes.sort((a: ResumeInfoType, b: ResumeInfoType) => compare(parseInt(a.desired_salary), parseInt(b.desired_salary), -1)).slice()
      }
    } else {
      if (props.pageType == 'vacancies') {
        sortedvacancies = vacancies.sort((a: VacancyType, b: VacancyType) => compare(a.publication_date.toString().split('T')[0], b.publication_date.toString().split('T')[0], 1,)).slice()
      } else {
        sortedresumes = resumes.sort((a: ResumeInfoType, b: ResumeInfoType) => compare(a.publication_date.toString().split('T')[0], b.publication_date.toString().split('T')[0], 1,)).slice()
      }
    }

    props.pageType == 'vacancies'
      ? setVacancies(sortedvacancies)
      : setResumes(sortedresumes)
  }

  const [city, setcity] = useState('');
  const [profession, setprofession] = useState('');
  return (
    <div className="home_container container">
      <p className="home-title">Работа найдется для каждого</p>

      {/* {data.loading ? <div>Загрузка</div> : <div>{data.collection[0].f_name}</div>} */}
      <section className='search'>
        <div className="search_inputs">
          <SearchInput home={true} value={profession} setValue={setprofession} searchChanged={searchChanged} text="Введите профессию" className='search__form search__form--prof' items={professionState} name='profession' handler={professionChanged}></SearchInput>
          <SearchInput home={true} value={city} setValue={setcity} searchChanged={cityNull} text="Введите город" className='search__form search__form--city' items={cityState} name='city' handler={cityChanged}></SearchInput>
          {/* <input className='search__form search__form--city' name='city' onChange={(e) => filterChanged(e)} value={filters.city} placeholder='Город' /> */}
        </div>

        <button onClick={confirm} className='button search__form--button'>
          {props.pageType === 'resumes' ? 'Найти резюме' : 'Найти работу'}
        </button>

      </section>
      <div className='sorting'>
        <select className='btn-filter' id='sorted' onChange={(e) => sorting(e)}>
          <option value='publication_date'>дате</option>
          <option value='des salary'>убыванию зарплаты</option>
          <option value='asc salary'>возрастанию зарплаты</option>
        </select>
      </div>
      <button onClick={openFilters} className='btn-filter'>
        Фильтры
      </button>


      {isFilters ? getFilters() : null}
      <section className='search__result col-lg-8 col-md-12'>
        {isSearch ?
          props.pageType === 'resumes' ?
            getResumeCards(resumes)
            :
            getVacancyCards(vacancies)
          : null
        }
      </section>

    </div >

  );
}

