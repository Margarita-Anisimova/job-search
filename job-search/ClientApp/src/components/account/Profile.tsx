
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import CompanyProfile from "./CompanyProfile";

export default function Profile(props: { account: AccountType, resume: ResumeType, company: CompanyType, setCompany: any }) {

    const navigate = useNavigate();
    // const userState = useSelector((state: any) => state.userState.userState)
    useEffect(() => {
        let a = props.resume;
        // getCompany();
    })

    function getAge() {
        return (new Date()).getFullYear() - props.resume.birth_date.split(':')[2]
    }

    const [company, setcompany] = useState(props.company);

    async function getCompany() {
        const response = await fetch(`company/${props.account.user_id}`);
        const data = await response.json();
        setcompany(data);
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
            {
                //вынести в отдельный компанент ????
                props.account.user_type != 'employer' ?
                    <div className="user_resumes_container">
                        <p><b>Резюме</b></p>
                        {props.resume.profession ?
                            <div className="resumeCard">
                                <p style={{ color: 'orange', fontSize: '20px' }}>{props.resume.desired_position}</p>
                                <p>{props.resume.desired_salary}</p>

                                <div className="resumeButtons">
                                    <button onClick={() => navigate('/resume')} className="resumeButton">Редактировать</button>
                                    <button className="resumeButton">Скрыть</button>
                                </div>
                            </div>
                            : <NavLink tag={Link} to='/resume' >Создать резюме</NavLink>
                        }
                    </div>
                    : <CompanyProfile setCompany={props.setCompany} company={props.company}></CompanyProfile>}
            {/* {props.account.user_type != 'employer' ?
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
                :
                <div className="user_company">
                    <p><b>Моя компания</b></p>
                    {company.fullname ?
                        <div className="company_card">
                            <p style={{ color: 'orange', fontSize: '20px' }}>{company.fullname}</p>
                            <p>{company.city}</p>

                            <div className="resumeButtons">
                                <button className="resumeButton">Редактировать</button>
                            </div>
                        </div>
                        : <NavLink tag={Link} to='/company'>Создать компанию</NavLink>
                    }

                </div>
            } */}

        </div >
    );
}