import * as React from 'react';
import ListResults from './ListResults';
import { useState, useEffect } from 'react';
import './Home.css';
import '../custom.css';

import { VacancyType, ResumesType } from './types'

export default function Home(props: { accountType: string; pageType: string }) {

  const [vacancies, setVacancies] = useState<VacancyType[]>([]);
  const [resumes, setResumes] = useState<ResumesType[]>([]);

  function getResult() {
    if (props.pageType === 'resumes') {
      setResumes([
        {
          type: 'resume',
          name: "Иванов Иван",
          profession: 'Разработчик Backend Go',
          city: 'Екатеринбург',
          experience: '3 года',
        },
        {
          type: 'resume',
          name: "Иванов Иван",
          profession: 'Разработчик Backend Go',
          city: 'Екатеринбург',
          experience: '3 года',
        },
        {
          type: 'resume',
          name: "Иванов Иван",
          profession: 'Разработчик Backend Go',
          city: 'Екатеринбург',
          experience: '3 года',
        }
      ]
      )
    } else {
      setVacancies([{
        type: 'vacancy',
        name: 'Разработчик Backend Go',
        salary: 'по договоренности',
        adress: 'Екатеринбург, Московская 100',
        description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник ',
      },
      {
        type: 'vacancy',
        name: 'Разработчик Backend Go',
        salary: 'по договоренности',
        adress: 'Екатеринбург, Московская 100',
        description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник ',
      },
      {
        type: 'vacancy',
        name: 'Разработчик Backend Go',
        salary: 'по договоренности',
        adress: 'Екатеринбург, Московская 100',
        description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник ',
      }
      ])
    }
  }

  const [data, setdata] = useState({ collection: [], loading: true });

  let getData = async () => {
    const response = await fetch('Table_1');
    const data = await response.json();
    setdata({ collection: data, loading: false });
  }

  // useEffect(() => {
  //   getData()
  // })

  return (
    <div className="home_container container">
      <p className="home-title">Работа найдется для каждого</p>

      {/* {data.loading ? <div>Загрузка</div> : <div>{data.collection[0].f_name}</div>} */}
      <section className='search'>
        <input className='search__form search__form--prof' placeholder='Введите профессию' />
        <input className='search__form search__form--city' placeholder='Город' />

        <button className='button search__form--button' onClick={getResult}>
          {props.pageType === 'resumes' ? 'Найти резюме' : 'Найти работу'}
        </button>
      </section>

      <button className='btn-filter'>
        Фильтры
      </button>

      <button className='btn-filter'>
        Сортировать по
      </button>

      <section className='search__result'>
        <ListResults results={props.pageType === 'resumes' ? resumes : vacancies}></ListResults>
      </section>

    </div >

  );
}

