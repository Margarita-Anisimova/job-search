import * as React from 'react';
import { useState, useEffect } from 'react';
import './VacancyCard.css';
import '../custom.css';
import Education from './resumeForm/Education';
import { VacancyType, ResumeType, CompanyType } from './types';
import { useLocation } from 'react-router-dom';
import { createEmptyVacancy, createEmptyCompany } from '../exportFunctions';
import { useHistory } from 'react-router';
// import { VacancyType, ResumesType } from './types'

export default function VacancyCard(props: { resume: ResumeType }) {

    const [vacancy, setVacancy] = useState<VacancyType>(createEmptyVacancy())

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
        setVacancy(data.vacancy);
        setCompany(data.company);

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
                <p className="phone">{company.email}</p>
                {company.phone ? <p className="email"> {company.phone}</p> : null}
            </div>


            {/* <button className='button resumecard__btn'>Отправить отклик</button> */}
        </div >

    );
}

