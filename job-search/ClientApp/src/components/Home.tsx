import * as React from 'react';
import ListResults from './ListResults';
import { useState, useEffect } from 'react';
import './Home.css';
import '../custom.css';
import SearchInput from './SearchInput'

import { VacancyType, ResumeType } from './types'
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import { useSelector } from 'react-redux';

export default function Home(props: { accountType: string; pageType: string }) {
  const userState = useSelector((state: any) => state.userState.userState)
  const [isFilters, setFiltersStatus] = useState(false);
  // const [vacancies, setVacancies] = useState<VacancyType[]>([]);
  // const [resumes, setResumes] = useState<ResumesType[]>([]);

  function getResult() { }

  const city_filter_values = ['Екатеринбург', 'Москва'];


  const [filters, setFilters] = useState({
    profession: '',
    city: '',
    education_level: '',
    salary: '',
    work_experience: '',
    work_type: [false, false, false, false, false]
  })
  // useEffect(() => {
  //   getData()
  // })

  function filterChanged(e) {
    let a = e.target || e
    setFilters({ ...filters, [a.name]: a.value })
  }

  function confirm() {
    if (props.pageType === 'resumes') {
      getResumes()
    } else {
      getVacancy()
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

  async function getResumes() {
    let str = `resume/?`
    Object.keys(filters).forEach(key => { str += `${key}=${filters[key]}&` })
    const response = await fetch(str);
    const data = await response.json();
    setResumes(data);
  }

  async function getVacancy() {
    let str = `vacancy/?`
    Object.keys(filters).forEach(key => { str += `${key}=${filters[key]}&` })
    const response = await fetch(str);
    const data = await response.json();
    setVacancies(data);
  }

  function getFilters() {
    return (
      <div>
        <div className='filters'>
          <label> Уровень образования</label>
          <select onChange={(e) => filterChanged(e)} value={filters.education_level} className="edu_level" name='education_level'>
            <option>Нет образования</option>
            <option>Среднее</option>
            <option>Незаконченное высшее</option>
            <option>Высшее</option>
            <option>Среднее профессиональное</option>
          </select>
          <label>Зарплата</label>
          <input type='text' name='salary' onChange={(e) => filterChanged(e)} value={filters.salary} placeholder='От руб'></input>
          <label>Стаж работы в сфере</label>
          <div>
            <div className="workexp_radio">
              <input className="radio_input" onChange={(e) => filterChanged(e)} id="workexp_radio-1" type="radio" name="work_experience" value="0" defaultChecked />
              <label htmlFor="workexp_radio-1">без опыта</label>
            </div>
            <div className="workexp_radio">
              <input className="radio_input" onChange={(e) => filterChanged(e)} id="workexp_radio-2" type="radio" name="work_experience" value="1-3" />
              <label htmlFor="workexp_radio-2">1-3 года</label>
            </div>
            <div className="workexp_radio">
              <input className="radio_input" onChange={(e) => filterChanged(e)} id="workexp_radio-3" type="radio" name="work_experience" value="3-5" />
              <label htmlFor="workexp_radio-3">3-5 лет</label>
            </div>
            <div className="workexp_radio">
              <input className="radio_input" onChange={(e) => filterChanged(e)} id="workexp_radio-4" type="radio" name="work_experience" value="5-50" />
              <label htmlFor="workexp_radio-4">более 5 лет</label>
            </div>
          </div>
          <label>График работы</label>
          <div className='chart_block'>
            <label> <input onChange={(e) => addTolist(e)} name='work_type' id="0" type='checkbox'></input>Полный рабочий день</label>
            <label> <input onChange={(e) => addTolist(e)} name='work_type' id="1" type='checkbox'></input>Гибкий</label>
            <label> <input onChange={(e) => addTolist(e)} name='work_type' id="2" type='checkbox'></input>Удаленная работа</label>
            <label> <input onChange={(e) => addTolist(e)} name='work_type' id="3" type='checkbox'></input>Сменный</label>
            <label> <input onChange={(e) => addTolist(e)} name='work_type' id="4" type='checkbox'></input>Вахтовая</label>
          </div>
        </div>
        <button onClick={confirm}>Применить</button>
      </div>

    )

  }

  function addTolist(e: any) {
    filters.work_type[e.target.id] = !filters.work_type[e.target.id];
  }

  function checkUser(e) {
    if (userState.user_type != 'employer') {
      alert('Полные резюме доступны только зарегистрированным работадателям')
      e.preventDefault()
    }
  }

  return (
    <div className="home_container container">

      <p className="home-title">Работа найдется для каждого</p>

      {/* {data.loading ? <div>Загрузка</div> : <div>{data.collection[0].f_name}</div>} */}
      <section className='search'>
        <input className='search__form search__form--prof' onChange={(e) => filterChanged(e)} name='profession' placeholder='Введите профессию' />
        {/* <input className='search__form search__form--city' placeholder='Город' /> */}
        <SearchInput className='search__form search__form--city' items={city_filter_values} name='city' handler={filterChanged}></SearchInput>
        <button onClick={confirm} className='button search__form--button'>
          {props.pageType === 'resumes' ? 'Найти резюме' : 'Найти работу'}
        </button>
      </section>

      <button onClick={() => setFiltersStatus(!isFilters)} className='btn-filter'>
        Фильтры
      </button>

      <button className='btn-filter'>
        Сортировать по
      </button>

      {isFilters ? getFilters() : null}
      <section className='search__result'>
        {
          props.pageType === 'resumes' ?
            resumes.map((res) => {
              return (
                <NavLink target="_blank" rel="noopener noreferrer" onClick={(e) => checkUser(e)} tag={Link} to={"/resumecard/" + res.user_id} >
                  <div className="card__container">
                    <p className='card__subtitle'>{res.desired_position}</p>
                    <p className='card__subtitle'>Опыт {res.work_experience}</p>
                    <p className='card__desc'>Уровень образования {res.education_level}</p>
                    <p className='card__address'>{res.desired_salary} </p>
                  </div>
                </NavLink>
              )
            })
            :
            vacancies.map((res) => {
              return (
                <NavLink target="_blank" rel="noopener noreferrer" onClick={(e) => checkUser(e)} tag={Link} to={"/vacancycard/" + res.vacancy_id} >
                  <div className="card__container">
                    <p className='card__subtitle'>{res.position}</p>
                    <p className='card__subtitle'>{res.work_address}</p>
                    <p className='card__desc'>Опыт {res.work_experience}</p>
                    <p className='card__address'>{res.desired_salary} </p>
                  </div>
                </NavLink>
              )
            })}
        {/* <ListResults results={props.pageType === 'resumes' ? resumes : vacancies}></ListResults> */}
      </section>

    </div >

  );
}

