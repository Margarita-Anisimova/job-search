import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "reactstrap";



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
                    <p className='card__subtitle'>{res.desired_position}</p>
                    <p className='card__subtitle'>Опыт {res.work_experience}</p>
                    <p className='card__desc'>Уровень образования {res.education_level}</p>
                    <p className='card__address'>{res.desired_salary} </p>
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
                    <p className='card__subtitle'>{res.position}</p>
                    <p className='card__subtitle'>{res.work_address}</p>
                    <p className='card__desc'>Опыт {res.work_experience}</p>
                    <p className='card__address'>{res.salary} </p>
                </div>
            </NavLink>
        )
    })
        : <p>Нет результатов</p>
}