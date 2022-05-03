import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "reactstrap";
import { getDate } from "../exportFunctions";
import './Home.css';
import { ResumeInfoType, VacancyType } from "./types";



// function checkUser(e) {
//     const userState = useSelector((state: any) => state.userState.userState)
//     if (userState.user_type != 'employer') {
//         alert('Полные резюме доступны только зарегистрированным работадателям')
//         e.preventDefault()
//     }
// }

export function getResumeCards(resumes: ResumeInfoType[]) {
    return resumes.length ? resumes.map((res) => {
        return (
            <NavLink style={{ padding: '0' }} target="_blank" rel="noopener noreferrer" tag={Link} to={"/resumecard/" + res.user_id} >
                <div className="card__container">
                    <div className="card__header">
                        <p className='card__title'>{res.desired_position}</p>
                        <p className='card__subtitle'>{res.desired_salary} руб.</p>
                    </div>

                    <div className="card__content">
                        <div>
                            <p className='card__desc'>Уровень образования: {res.education_level}</p>
                            <p className='card__address'>Стаж работы в сфере: {res.work_experience}</p>
                        </div>
                        <p className='publication_date'>{getDate(res.publication_date)}</p>
                        

                    </div>
                    
                    {/* <button className="card_button light__button">Откликнуться</button>
                    <button className="card_button light__button">Показать контакты</button> */}
                </div>
            </NavLink>
        )
    })
        : <p>Нет результатов</p>


}

export function getVacancyCards(vacancies: VacancyType[]) {
    return vacancies.length ? vacancies.map((res) => {
        return (
            <NavLink style={{ padding: '0' }} target="_blank" rel="noopener noreferrer" tag={Link} to={"/vacancycard/" + res.vacancy_id} >
                <div className="card__container">
                    <div className="card__header">
                        <p className='card__title'>{res.position}</p>
                        <p className='card__subtitle'>{res.salary} руб.</p>
                    </div>

                    <div className="card__content">
                        <p className='card__desc'>Уровень образования: {res.education_level}</p>
                        <p className='card__desc'>Опыт: {res.work_experience}</p>
                        <p className='card__desc card__shortdescription'>{res.responsibilities}</p>
                        <p className='card__address'>{res.work_address} </p>
                    </div>
                    <p className='publication_date'>{getDate(res.publication_date)}</p>
                    {/* <button className="light__button card__button-main">Откликнуться</button>
                    <button className="light__button card__button-second">Показать контакты</button>
                    <button className="light__button button__collection">Показать резюме</button> */}

                </div>
            </NavLink>
        )
    })
        : <p>Нет результатов</p>
}