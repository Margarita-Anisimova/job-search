
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Profile(props: { account: AccountType, resume: ResumeType }) {

    const navigate = useNavigate();

    useEffect(() => {
        let a = props.resume
    })

    function getAge() {
        return (new Date()).getFullYear() - props.resume.birth_date.split(':')[2]
    }

    return (
        <div className='pofile_container'>
            <div className="mainInfo">
                <img src={img} className='avatar'></img>
                <div className="userDescription">
                    <p>{props.account.l_name + ' ' + props.account.f_name}</p>
                    {props.account.user_type != 'employer' ?
                        <>
                            <p>{getAge() ? getAge() + ' лет' : null}</p>
                            <p>{props.resume.city ? props.resume.city : null}</p>
                            <p>{props.resume.citizenship ? 'Гражданство ' + props.resume.citizenship : null}</p>
                        </> : null}
                    <p>{props.account.phoneNumber ? props.account.phoneNumber : null}</p>
                    <p>{props.account.email}</p>
                </div>

                <NavLink tag={Link} to='/accountInfo'> Редактировать профиль</NavLink>
            </div>
            <div className="user_resumes_container">
                <p><b>Резюме</b></p>
                {props.resume.profession ?
                    <div className="resumeCard">
                        <p style={{ color: 'orange', fontSize: '20px' }}>{props.resume.desired_position}</p>
                        <p>{props.resume.desired_salary}</p>

                        <div className="resumeButtons">
                            <button className="resumeButton">Редактировать</button>
                            <button className="resumeButton">Удалить</button>
                        </div>
                    </div>
                    : <NavLink tag={Link} to='/resume' >Создать резюме</NavLink>
                }
            </div>
        </div >
    );
}