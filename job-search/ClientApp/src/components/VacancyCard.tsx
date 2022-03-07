import * as React from 'react';
import ListResults from './ListResults';
import { useState, useEffect } from 'react';
import './VacancyCard.css';
import '../custom.css';
import { NavItem, NavLink } from 'reactstrap';


import { VacancyType, ResumesType } from './types'

export default function VacancyCard () {

  // const [vacancies, setVacancies] = useState<VacancyType[]>([]);
  // const [resumes, setResumes] = useState<ResumesType[]>([]);

  const [vacancycard, setvacancycard] = useState({
    position: 'Разработчик Backend Go',
    work_experience: '1-3 года',
    company: 'Company name',
    education_type: 'высшее',
    salary: 'по договоренности',
    work_type: 'полный рабочий день',
    workingcond: 'полная',
    work_address: 'Екатеринбург, Московская 100',
    responsibilities: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник ',
    requirements: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник ',
    description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник ',   
  })

  const [data, setdata] = useState({ collection: [], loading: true });

  return (
    <div className="vacancycard_container container">
      <div className='row vacancycard_row'>
        <div className='vacancycard_header col-md-6'>
            <h4 className='vacancycard_title'>{vacancycard.position}</h4>
            <p className='vacancycard_suptitle'>{vacancycard.salary}</p>
            <p>{vacancycard.company}</p>
            <p>{vacancycard.description}</p>
        </div>
        <div className='vacancycard_logo col-md-6'>
          <p>ЛОГОТИП</p>
        </div>
      </div>
      <div className='row req_main'>
        <div className='vacancycard_reqresp col-md-6'>
          <h6>Обязанности</h6>
          <p>{vacancycard.requirements}</p>
          <h6>Требования</h6>
          <p>{vacancycard.responsibilities}</p>
        </div>
        <div className='vacancycard_maininfo col-md-5'>
          <div className='maininfo_container'>
            <h5>Общие сведения</h5>
            <p>Уровень образования: {vacancycard.education_type}</p>
            <p>Стаж работы в сфере: {vacancycard.work_experience}</p>
            <p>График работы: {vacancycard.workingcond}</p>
            <p>Тип занятости: {vacancycard.work_type}</p>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='vacancycard_address col-md-6'>
          <h5>Адрес места работы</h5>
          <p>{vacancycard.work_address}</p>
        </div>
      </div>
      <div className='row'>
        <div className='vacancycard_contact col-md-6'>
          <h5>Контактная информация</h5>
          <p>{vacancycard.work_address}</p>
        </div>
      </div>
      <button className='button vacancycard_button'>Откликнуться</button>

    </div >

  );
}

