
import React from "react";
import { useState, useEffect } from "react";
import '../resumeForm/Resume.css';
import { createTextInputs, createSelectsContainer } from './createFunction'
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { useSelector } from "react-redux";

function VacancyCollections(props: { resume: ResumeType }) {
    const navigate = useNavigate();

    const userState = useSelector((state: any) => state.userState.userState)
    useEffect(() => {
        if (vacancies.length === 0) {
            getVacancy()
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

    async function getVacancy() {
        let str = `vacancy/?`
        Object.keys(filters).forEach(key => { str += `${key}=${filters[key]}&` })
        const response = await fetch(str);
        const data = await response.json();
        setVacancies(data);
    }

    return (
        <div>
            {
                vacancies.length ?
                    vacancies.map((res) => {
                        return (
                            <NavLink target="_blank" rel="noopener noreferrer" tag={Link} to={"/vacancycard/" + res.vacancy_id} >
                                <div className="card__container">
                                    <p className='card__subtitle'>{res.position}</p>
                                    <p className='card__subtitle'>{res.work_address}</p>
                                    <p className='card__desc'>Опыт {res.work_experience}</p>
                                    <p className='card__address'>{res.desired_salary} </p>
                                </div>
                            </NavLink>
                        )
                    })
                    : <p>Не найдено подходящих вакансий</p>}
        </div >
    );
}

export default VacancyCollections;