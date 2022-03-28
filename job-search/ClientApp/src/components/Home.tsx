import * as React from 'react';
import ListResults from './ListResults';
import { useState, useEffect } from 'react';
import './Home.css';
import '../custom.css';
import SearchInput from './SearchInput'

import { VacancyType, ResumeType } from './types'

export default function Home(props: { accountType: string; pageType: string }) {

  const [isFilters, setFiltersStatus] = useState(false);
  // const [vacancies, setVacancies] = useState<VacancyType[]>([]);
  // const [resumes, setResumes] = useState<ResumesType[]>([]);

  function getResult() { }

  const city_filter_values = ['Екатернибург', 'Москва'];
  let filters = {
    city: '',
    ready_move: false,
    education_level: '',
    salary: '',
    work_type: [false, false, false, false, false]
  }
  // useEffect(() => {
  //   getData()
  // })

  function filterChanged(e) {
    let a = e.target || e
    filters[a.name] = a.value
  }

  function setFilters() {

  }

  // async function getResumes() {

  //   const data = await fetch(`resumes/${formInfo.email}/${formInfo.password}`)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json()

  //       } else if (response.status === 404) {
  //         document.querySelectorAll('.usererrormessage')[0].style.display = 'block'
  //       }
  //     })
  //   // delete data.password;
  //   props.setAccount(data)
  //   dispatch(changeUser({ user_id: data.user_id, user_type: data.user_type }))
  //   navigate('/');
  // }

  function getFilters() {
    return (
      <div>
        <div className='filters'>
          <label> Уровень образования</label>
          <select onChange={filterChanged} className="edu_level" name='education_level'>
            <option>Нет образования</option>
            <option>Среднее</option>
            <option>Незаконченное высшее</option>
            <option>Высшее</option>
            <option>Среднее профессиональное</option>
          </select>
          <label>Зарплата</label>
          <input type='text' value={filters.salary} name='salary' onChange={filterChanged} placeholder='От руб'></input>
          <label>Стаж работы в сфере</label>
          <div>
            <div className="workexp_radio">
              <input className="radio_input" onChange={filterChanged} id="workexp_radio-1" type="radio" name="work_experience" value="без опыта" defaultChecked />
              <label htmlFor="workexp_radio-1">без опыта</label>
            </div>
            <div className="workexp_radio">
              <input className="radio_input" onChange={filterChanged} id="workexp_radio-2" type="radio" name="work_experience" value="1-3 года" />
              <label htmlFor="workexp_radio-2">1-3 года</label>
            </div>
            <div className="workexp_radio">
              <input className="radio_input" onChange={filterChanged} id="workexp_radio-3" type="radio" name="work_experience" value="3-5 лет" />
              <label htmlFor="workexp_radio-3">3-5 лет</label>
            </div>
            <div className="workexp_radio">
              <input className="radio_input" onChange={filterChanged} id="workexp_radio-4" type="radio" name="work_experience" value="более 5 лет" />
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
        <button onClick={setFilters}>Применить</button>
      </div>

    )

  }

  function addTolist(e: any) {
    filters.work_type[e.target.id] = !filters.work_type[e.target.id];
  }


  return (
    <div className="home_container container">

      <p className="home-title">Работа найдется для каждого</p>

      {/* {data.loading ? <div>Загрузка</div> : <div>{data.collection[0].f_name}</div>} */}
      <section className='search'>
        <input className='search__form search__form--prof' placeholder='Введите профессию' />
        {/* <input className='search__form search__form--city' placeholder='Город' /> */}
        <SearchInput className='search__form search__form--city' items={city_filter_values} name='city' handler={filterChanged}></SearchInput>
        <button className='button search__form--button' onClick={getResult}>
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
        {/* <ListResults results={props.pageType === 'resumes' ? resumes : vacancies}></ListResults> */}
      </section>

    </div >

  );
}

