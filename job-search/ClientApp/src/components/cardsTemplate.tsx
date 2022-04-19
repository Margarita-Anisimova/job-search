import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "reactstrap";
import './Home.css';



// function checkUser(e) {
//     const userState = useSelector((state: any) => state.userState.userState)
//     if (userState.user_type != 'employer') {
//         alert('Полные резюме доступны только зарегистрированным работадателям')
//         e.preventDefault()
//     }
// }

export function getResumeCards(resumes) {
    return resumes.length ? resumes.map((res) => {
        return (
            // onClick={(e) => checkUser(e)}
            <NavLink target="_blank" rel="noopener noreferrer"  tag={Link} to={"/resumecard/" + res.user_id} >
                <div className="card__container">
                    <div className="card_header">
                        <p className='card__title'>{res.desired_position}</p>
                        <p className='card__subtitle'>{res.desired_salary} руб.</p>
                    </div>
                    <p className='card__desc'>Уровень образования: {res.education_level}</p>
                    <p className='card__address'>Опыт: {res.work_experience}</p>
                </div>
            </NavLink>
        )
    })
        : <p>Нет результатов</p>


}

export function getVacancyCards(vacancies) {
    return vacancies.length ? vacancies.map((res) => {
        return (
            <NavLink target="_blank" rel="noopener noreferrer" tag={Link} to={"/vacancycard/" + res.vacancy_id} >
                <div className="card__container">
                    <div className="card_header">
                        <p className='card__title'>{res.position}</p>
                        <p className='card__subtitle'>{res.salary} руб.</p>
                    </div>
                    <p className='card__desc'>Опыт: {res.work_experience}</p>
                    <p className='card__address'>{res.work_address} </p>
                </div>
            </NavLink>
        )
    })
        : <p>Нет результатов</p>
}