
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import CompanyProfile from "./CompanyProfile";
import { useDispatch, useSelector } from "react-redux";

import { createEmptyCompany, createEmptyResume, createEmptyAccount } from '../../exportFunctions'
import { deleteResume } from "../baseconnect";
import { changeResume } from "../../app/resumeStateReducer";

export default function Profile() {

    const navigate = useNavigate();
    const userState: AccountType = useSelector((state: any) => state.userState.userState)
    const resumeState: ResumeType = useSelector((state: any) => state.resumeState.resumeState)

    const dispatch = useDispatch();

    function getAge() {
        return (new Date()).getFullYear() - parseInt(resumeState.resumeInfo.birth_date.split(':')[2])
    }

    function delResume() {
        deleteResume(resumeState.resumeInfo.resume_id)
        dispatch(changeResume({ resumeState: createEmptyResume() }))
    }

    return (
        <div className='pofile_container'>
            <div className="mainInfo">
                <img src={img} className='avatar'></img>
                <div className="userDescription">
                    <p className="username">{userState.l_name + ' ' + userState.f_name}</p>
                    <p>{userState.phone_number ? userState.phone_number : null}</p>
                    <p>{userState.email}</p>
                </div>

                <NavLink tag={Link} to='/accountInfo'> Редактировать профиль</NavLink>
            </div>
            {
                //вынести в отдельный компанент ????
                userState.user_type != 'employer' ?
                    <div className="user_resumes_container">
                        <p className="profile_sect-title">Мое резюме</p>
                        {resumeState.resumeInfo.city ?
                            <div className="resumeCard">
                                <p style={{ color: '#F88500', fontSize: '20px' }}>{resumeState.resumeInfo.desired_position}</p>
                                <p>{resumeState.resumeInfo.desired_salary}</p>

                                <div className="resumeButtons">
                                    <button onClick={() => navigate('/resume')} className="resumeButton">Редактировать</button>
                                    <button onClick={() => delResume()} className="resumeButton">Удалить</button>
                                </div>
                            </div>
                            : <NavLink tag={Link} to='/resume' >Создать резюме</NavLink>
                        }
                    </div>
                    : <CompanyProfile></CompanyProfile>}
        </div >
    );
}