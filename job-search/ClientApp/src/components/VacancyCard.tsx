import * as React from 'react';
import { useState, useEffect } from 'react';
import './VacancyCard.css';
import '../custom.css';
import Education from './resumeForm/Education';
import { VacancyType, ResumeType, CompanyType } from './types';
import { useLocation } from 'react-router-dom';
import { createEmptyVacancy, createEmptyCompany } from '../exportFunctions';
import { useHistory } from 'react-router';
import callimg from './call.svg'
import mailimg from './mail.svg'
// import { VacancyType, ResumesType } from './types'

export default function VacancyCard(props: { resume: ResumeType }) {

    const [vacancy, setVacancy] = useState<VacancyType>(createEmptyVacancy())
    const workType = ['Полный рабочий день', 'Гибкий', 'Удаленная работа', 'Сменный', 'Вахтовая']
    let location = useLocation();
    const id = parseInt(location.pathname.split('/')[2])
    const [company, setCompany] = useState(createEmptyCompany())

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });
        if (vacancy.vacancy_id == 0) {
            getVacancy()
        }

    })

    async function getVacancy() {
        const data = await fetch(`vacancy/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()

                }
            })
        await changeWorkType(data);
        setVacancy(data.vacancy);
        setCompany(data.company);

    }

    function changeWorkType(data) {

        data.vacancy.work_type = data.vacancy.work_type.split(',')
        data.vacancy.work_type = data.vacancy.work_type.map(e => e === 'true' ? true : false)
    }

    return (
        <div className="container vacancycard__container">
            <div className="vacancy_maininfo">
                <div className="vacancy_profession">{vacancy.position}</div>
                <div className="vacancy_salary">{vacancy.salary} руб</div>
                <div className="vacancy_company">{company.fullname}</div>
            </div>

            <div className="vacancy_description row">
                <div className="vacancy_requriments col-md-6">
                    <div className='briefinfo_title'>Обязанности</div>
                    <div className="requirements">
                        {vacancy.responsibilities}
                    </div>
                    <div className='briefinfo_title'>Требования</div>
                    <div className="responsibilities">
                        {vacancy.requirements}
                    </div>
                </div>
                <div className="col-md-1"></div>
                <div className="vacancy_brief col-md-5">
                    <div className="borders">
                        <div className='briefinfo_title'>Общие сведения</div>
                        <div className="education">Уровень образования: {vacancy.education_level}</div>
                        <div className="work_exp">Стаж работы в сфере: {vacancy.work_experience}</div>
                        <div className="work_type">График работы: {vacancy.work_type.map((e, i) => e ? workType[i] + ' ' : '')}</div>
                    </div>
                </div>
            </div>

            <div className="vacancy_address">
                <div className='address_title'>Адрес места работы</div>
                {vacancy.work_address}
            </div>

            <div className="vacancy_contact">
                <div className='contact_title'>Контактная информация</div>
                <div className="contact_mail">
                    <img src={mailimg} alt="" />
                    <p className="email">{company.email}</p>
                </div>
                {company.phone ? 
                    <div className="contact_phone">
                        <img src={callimg} alt="" />
                        <p className="phone"> {company.phone}</p> 
                    </div>
                : null}
            </div>


            {/* <button className='button resumecard__btn'>Отправить отклик</button> */}
        </div >

    );
}

