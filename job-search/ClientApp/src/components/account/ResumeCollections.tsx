
import React from "react";
import { useState, useEffect } from "react";
import '../resumeForm/Resume.css';
import { createTextInputs, createSelectsContainer } from './createFunction'
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { AccountType, CompanyType, VacancyType, ResumeType } from '../types';
import { useSelector } from "react-redux";
import "./Account.css"

function ResumeCollections() {
    const navigate = useNavigate();
    const companyState: CompanyType = useSelector((state: any) => state.companyState.companyState)
    useEffect(() => {
    })

    const [resumes, setResumes] = useState([]);
    const [status, setStatus] = useState(false);



    async function getResumes(filters) {
        let str = `resume/?`
        Object.keys(filters).forEach(key => { str += `${key}=${filters[key]}&` })
        const response = await fetch(str);
        const data = await response.json();
        setResumes(data);
    }

    function showResumeCollect(vacancy: VacancyType) {

        if (!status) {
            const filters = {
                profession_id: vacancy.profession_id,
                city: companyState.companyInfo.city,
                education_level: vacancy.education_level,
                salary: vacancy.salary,
                work_experience: vacancy.work_experience,
                work_type: vacancy.work_type,
            }
            getResumes(filters)
        }
        setStatus(!status)
    }

    return (
        <div className='container1'>
            <div>
                {companyState.vacancies.map((res: VacancyType) => {
                    return (
                        // <a onClick={() => showResumeCollect(res)}>
                        <div className="card__container">
                            <p className='card__title'>{res.position}</p>
                            <p className='card__subtitle'>{res.work_address}</p>
                            <p className='card__desc'>Опыт {res.work_experience}</p>
                            <p className='card__address'>{res.salary} </p>
                            <button className="light__button-small" onClick={() => showResumeCollect(res)}>Показать резюме</button>
                        </div>
                        // </a>
                    )
                })}
            </div>
            <div>
                {status ?
                    <div>
                        {resumes.map((res) => {
                            return (
                                <NavLink target="_blank" rel="noopener noreferrer" tag={Link} to={"/resumecard/" + res.user_id} >
                                    <div className="card__container">
                                        <p className='card__title'>{res.desired_position}</p>
                                        <p className='card__subtitle'>Опыт {res.work_experience}</p>
                                        <p className='card__desc'>Уровень образования {res.education_level}</p>
                                        <p className='card__address'>{res.desired_salary} </p>
                                    </div>
                                </NavLink>
                            )
                        })
                        }
                    </div>
                    : null}
            </div>
        </div >
    )
}

export default ResumeCollections;