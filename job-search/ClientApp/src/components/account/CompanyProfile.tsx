
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteVacansy } from "../../app/companyStateReducer";
import { deleteVacansyFromBase } from "../baseconnect";


export default function CompanyProfile() {

    const navigate = useNavigate();
    const companyState: CompanyType = useSelector((state: any) => state.companyState.companyState)
    const dispatch = useDispatch();

    function delVacansy(vacancy_id: number, index: number) {
        dispatch(deleteVacansy({ id: index }))
        deleteVacansyFromBase(vacancy_id)
    }

    return (
        <div>
            <p className="profile_sect-title">Моя компания</p>
            <button onClick={() => navigate('/company')}>Добавить сотрудника</button>
            {companyState.companyInfo.fullname ?
                <div className="user_resumes_container resumeCard">
                    <div className="card_maininfo">
                        <p className="card__title"> {companyState.companyInfo.fullname}</p>
                        <p className="card__subtitle">{companyState.companyInfo.city}</p>
                        <p className="card__desc">{companyState.companyInfo.email}</p>
                    </div>
                    <button onClick={() => navigate('/company')} className="resumeButton">Редактировать</button>
                </div>
                : <NavLink tag={Link} to='/company'>Создать компанию</NavLink>}
            <div className="vacancyInfo">
                <p className="profile_sect-title">Мои вакансии</p>
                <NavLink tag={Link} to={'/vacancy/' + companyState.vacancies.length} >Добавить вакансию</NavLink>
            </div>
            {companyState.vacancies.map((vacancy, i) => {
                return <div className='resumeCard'>
                    <div className="card_maininfo">
                        <p className="card__title">{vacancy.position}</p>
                        <p className="card__subtitle">{vacancy.salary} руб.</p>
                        <p className="card__desc">{vacancy.work_address}</p>
                    </div>
                    <div className="card_buttons">
                        <button onClick={() => navigate('/vacancy/' + i)} className="resumeButton">Редактировать</button>
                        <button onClick={() => delVacansy(vacancy.vacancy_id, i)} className="resumeButton">Удалить</button>
                    </div>
                </div >
            })}
        </div >
    );
}