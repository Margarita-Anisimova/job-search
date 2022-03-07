
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


export default function CompanyProfile(props: { company: CompanyType, setCompany: any }) {

    const navigate = useNavigate();

    function deleteVacansy(i: number) {
        let arr = props.company.vacancies.slice();
        arr.splice(i, 1);
        props.setCompany({ ...props.company, vacancies: arr })
    }

    return (
        <div>
            <div className="user_resumes_container resumeCard">
                <p> {props.company.fullname}</p>
                <p>{props.company.city}</p>
                <p>{props.company.email}</p>
                <NavLink tag={Link} to='/company'>Редактировать</NavLink>
            </div>


            <NavLink tag={Link} to={'/vacancy/' + props.company.vacancies.length} >Добавить вакансию</NavLink>
            {props.company.vacancies.map((vacancy, i) => {
                return <div className='resumeCard'>
                    <p>{vacancy.position}</p>
                    <p>{vacancy.salary}</p>
                    <p>{vacancy.work_address}</p>
                    <button onClick={() => navigate('/vacancy/' + i)} className="resumeButton">Редактировать</button>
                    <button onClick={() => deleteVacansy(i)} className="resumeButton">Удалить</button>
                </div>
            })}
        </div>
    );
}