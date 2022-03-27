import * as React from 'react';
import { useState, useEffect } from 'react';
import './VacancyCard.css';
import '../custom.css';
import Education from './resumeForm/Education';
import { VacancyType } from './types';

// import { VacancyType, ResumesType } from './types'

export default function VacancyCard() {

    const [vacancy, setVacancy] = useState<VacancyType>(createExampleVacancy())

    function createExampleVacancy(): VacancyType {
        return {
            vacancy_id: 0,
            company_id: 0,
            vacancy_name: '',
            position: '',
            profession: 'Программист 1С (отдел ПО)',
            work_experience: '1-3 года',
            education_type: 'cреднее',
            salary: '30000',
            work_type: 'полный рабочий день',
            work_address: 'Екатеринбург, Московская 20',
            responsibilities: '1С: Бухгалтерия Предприятия 3.0 - поддержка, обновление, создание внешних отчетов и обработок. Организация обменов различными способами: файловый обмен, COM-соединение, web-сервис.',
            requirements: 'Опыт работы с 1С: БП 3.0 от 3 лет, знание основ бухгалтерского учета. Желателен опыт работы с большими объемами данных, организация обменов.',
        }
    }

  return (
    <div className="container vacancycard__container">
        <div className="vacancy_maininfo">
            <div className="vacancy_profession">{vacancy.profession}</div>
            <div className="vacancy_salary">{vacancy.salary} руб</div>
            <div className="vacancy_company">сеть магазинов “Перекресток”</div>
        </div>

        <div className="vacancy_description row">
            <div className="vacancy_requriments col-md-6">
                <div className='briefinfo_title'>Обязанности</div>
                <div className="requirements">
                    {vacancy.requirements}
                </div>
                <div className='briefinfo_title'>Требования</div>
                <div className="responsibilities">
                    {vacancy.responsibilities}
                </div>
            </div>
            <div className="col-md-1"></div>
            <div className="vacancy_brief col-md-5">
                <div className="borders">
                    <div className='briefinfo_title'>Общие сведения</div>
                    <div className="education">Уровень образования: {vacancy.education_type}</div>
                    <div className="work_exp">Стаж работы в сфере: {vacancy.work_experience}</div>
                    <div className="work_type">График работы: {vacancy.work_type}</div>
                </div>
            </div>
        </div>

        <div className="vacancy_address">
        <div className='address_title'>Адрес места работы</div>
            {vacancy.work_address}
        </div>

        <div className="vacancy_contact">
        <div className='contact_title'>Контактная информация</div>
            <p className="phone">8 (900) 999 99 99</p>
            <p className="email">perekrestor@gmail.com</p>
        </div>

 
      <button className='button resumecard__btn'>Отправить отклик</button>
    </div >

  );
}

