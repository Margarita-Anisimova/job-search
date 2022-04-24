
import React from "react";
import { useState, useEffect } from "react";
import '../resumeForm/Resume.css';
import { createTextInputs, createSelectsContainer } from './createFunction'
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { useSelector } from "react-redux";
import { getVacancyCards, getResumeCards } from '../cardsTemplate'


function VacancyCollections(props: { resume: ResumeType }) {
    const navigate = useNavigate();

    const userState = useSelector((state: any) => state.userState.userState)
    useEffect(() => {
        if (vacancies.length === 0) {
            getVacancy(filters)
        }
    })

    const [vacancies, setVacancies] = useState([]);

    const filters = {
        profession_id: props.resume.resumeInfo.profession_id,
        city: props.resume.resumeInfo.city,
        education_level: props.resume.resumeInfo.education_level,
        salary: props.resume.resumeInfo.desired_salary,
        work_experience: props.resume.resumeInfo.work_experience,
        work_type: props.resume.resumeInfo.work_type,
        isFilters: false,
    }

    async function getVacancy(filters) {
        let str = `vacancy/?`
        Object.keys(filters).forEach(key => { str += `${key}=${filters[key]}&` })
        const response = await fetch(str);
        const data = await response.json();
        setVacancies(data);
    }

    return (
        <div className='search__result col-lg-8 col-md-12'>
            {getVacancyCards(vacancies)}
            {/* {
                vacancies.length ?
                    vacancies.map((res) => {
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
                    : <p>Не найдено подходящих вакансий</p>} */}
        </div >
    );
}

export default VacancyCollections;