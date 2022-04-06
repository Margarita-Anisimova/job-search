import * as React from 'react';
import ListResults from './ListResults';
import { useState, useEffect } from 'react';
import './Home.css';
import '../custom.css';
import SearchInput from './SearchInput'
import { getVacancyCards, getResumeCards } from './cardsTemplate'
import { getEducationLevel, getWorkExperience, getWorkType } from './formElements'
import { VacancyType, ResumeType } from './types'
import { getResumesByFilters, getVacanciesByFilters } from './baseconnect'
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import { useSelector } from 'react-redux';

export default function Home(props: { professionList: any, accountType: string; pageType: string }) {
  const userState = useSelector((state: any) => state.userState.userState)
  // const city_filter_values = useSelector((state: any) => state.professionsList.professionsList)
  const [isFilters, setFiltersStatus] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [filters, setFilters] = useState({
    profession_id: 0,
    city: '',
    education_level: '',
    salary: '',
    work_experience: '',
    work_type: [false, false, false, false, false],
    isFilters: true,
  })

  function filterChanged(e) {
    let a = e.target || e
    setFilters({ ...filters, [a.name]: a.value })
  }

  function professionChanged(value: number) {
    setFilters({ ...filters, profession_id: value })
  }

  function confirm() {
    if (filters.profession_id != 0) {
      setIsSearch(true);
      if (props.pageType === 'resumes') {
        getResumesByFilters(filters, setResumes)
      } else {
        getVacanciesByFilters(filters, setVacancies)
      }

    }

  }

  useEffect(() => {
    let name = 'user'
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    console.log(matches ? decodeURIComponent(matches[1]) : undefined)
  })

  const [resumes, setResumes] = useState([]);
  const [vacancies, setVacancies] = useState([]);

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
        <button onClick={confirm}>Применить</button>
      </div>
    )
  }

  const city_filter_values = ['Екатеринбург', 'Москва'];


  return (
    <div className="home_container container">

      <p className="home-title">Работа найдется для каждого</p>

      {/* {data.loading ? <div>Загрузка</div> : <div>{data.collection[0].f_name}</div>} */}
      <section className='search'>
        {/* <input className='search__form search__form--prof' onChange={(e) => filterChanged(e)} name='profession' placeholder='Введите профессию' /> */}
        <SearchInput className='search__form search__form--prof' items={props.professionList} name='profession' handler={professionChanged}></SearchInput>
        <input className='search__form search__form--city' placeholder='Город' />



        <button onClick={confirm} className='button search__form--button'>
          {props.pageType === 'resumes' ? 'Найти резюме' : 'Найти работу'}
        </button>
      </section>

      <button onClick={() => setFiltersStatus(!isFilters)} className='btn-filter'>
        Фильтры
      </button>

      {isFilters ? getFilters() : null}
      <section className='search__result'>
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

