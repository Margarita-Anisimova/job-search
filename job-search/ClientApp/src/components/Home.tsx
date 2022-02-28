import * as React from 'react';
import ListResults from './ListResults';
import { useState } from 'react';
import './Home.css';
import { VacancyType, ResumesType } from './types'

export default function Home(props: { accountType: string; pageType: string }) {

  const [vacancies, setVacancies] = useState<VacancyType[]>([]);
  const [resumes, setResumes] = useState<ResumesType[]>([]);

  function restart() {

  }

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

  return (
    <div className="home_container">
      {restart()}
      <p className="home-title">Работа найдется для каждого</p>
      <section>
        <input placeholder='Введите профессию' />
        <input placeholder='Город' />

        <button onClick={getResult}>
          {props.pageType === 'resumes' ? 'Найти резюме' : 'Найти работу'}
        </button>
      </section>
      <button>
        Фильтры
      </button>
      <button>
        Сортировать по
      </button>
      <section>
        <ListResults results={props.pageType === 'resumes' ? resumes : vacancies}></ListResults>
      </section>

    </div >
  );
}

