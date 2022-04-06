import * as React from 'react';
import { useState, useEffect } from 'react';
import './ResumeCard.css';
import '../custom.css';
import { EducationType, ResumeType, WorkExpirienceType, CompanyType, AccountType } from './types';
import { useLocation } from 'react-router-dom';
import { createEmptyAccount, createEmptyResume } from '../exportFunctions';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';


export default function ResumeCard(props: { company: CompanyType }) {

    let location = useLocation();
    const id = parseInt(location.pathname.split('/')[2])
    const [resume, setResume] = useState<ResumeType>(createEmptyResume())
    const [account, setAccount] = useState<AccountType>(createEmptyAccount())
    const [IsContacts, setIsContacts] = useState(false)
    const workType = ['Полный рабочий день', 'Гибкий', 'Удаленная работа', 'Сменный', 'Вахтовая']
    const [profession, setProfession] = useState('')
    // const [button, setButton] = useState('show');
    // const [message, setMessage] = useState("");
    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });
        if (resume.resumeInfo.resume_id == 0) {
            getResume()
        }

    })

    async function getResume() {
        const data = await fetch(`resume/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()

                }
            })
        await changeData(data)
        setResume(data.resume);
        setAccount(data.user);
        setProfession(data.profession);

    }

    function changeData(data) {
        if (data.resume.resumeInfo.profession_id !== 0) {

            data.resume.resumeInfo.work_type = data.resume.resumeInfo.work_type.split(',')
            data.resume.resumeInfo.work_type = data.resume.resumeInfo.work_type.map(e => e === 'true' ? true : false)
            let t = {}
            data.resume.resumeInfo.skills.split(',').forEach((e: string) => { t[e] = e })
            data.resume.resumeInfo.skills = t;
        }

    }

    async function sentResponse() {
        // setButton('sented')
        const response = await fetch('responseToResume', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({
                company_id: props.company.companyInfo.company_id,
                resume_id: resume.resumeInfo.resume_id,
                // message: message
            })
        })
    }
    const userState = useSelector((state: any) => state.userState.userState)
    function checkUser(e) {
        if (userState.user_type != 'employer' || !userState.fullemployer) {
            alert('Контакты доступны только работодателям, создавшим компанию!!!')
        } else {
            setIsContacts(true)
        }
    }

    return (
        <div className="container resumecard__container">
            <div className="resumecard__title row">
                <div className="resumecard__title-img col-md-2">
                    <img src="https://static.planetminecraft.com/files/avatar/1268532_1.png" />
                </div>
                <div className="resumecard__title-maininfo col-md-4">
                    <div className="user_name">{account.f_name + ' ' + account.l_name}</div>
                    {/* <div className="user_birthday">{resume.resumeInfo.birth_date}</div> */}
                    <div className="user_city">{resume.resumeInfo.city}</div>
                    <div className="user_citizenship"> {'Гражданство ' + resume.resumeInfo.citizenship}</div>
                </div>
                <div className="resumecard__title-buttons col-md-3">
                    {/* <button className='button resumecard__btn'>Отправить отклик</button> */}
                    <button onClick={() => checkUser()} className='resumecard__btn-light'>Показать контакты</button>
                    {IsContacts ?
                        <div className="resumecard__title-maininfo col-md-4">
                            {account.phoneNumber ?
                                <div className="user_name">{account.phoneNumber}</div>
                                : null}
                            <div className="user_birthday">{account.email}</div>
                        </div>
                        : null}
                </div>
            </div>

            <div className="desired_profession">
                <div className='desired_profession__name'>{profession}</div>
                <div className='desired_profession__salary'>{resume.resumeInfo.desired_salary + 'руб'} </div>
                <div className='desired_profession__readymove'> Переезд: {+ resume.resumeInfo.ready_move ? 'возможен' : 'не возможен'} </div>
                {/* <div className='desired_profession__work_type'>График работы:</div> */}
                <div className="desired_profession__work_type">График работы: {resume.resumeInfo.work_type.map((e, i) => e ? workType[i] + ' ' : '')}</div>
            </div>

            <div className="work_experiences">
                <h3 className='section_title'>Опыт работы</h3>
                {resume.workExperience.length ? resume.workExperience.map((e) => {
                    return (
                        <div className="work_exp row">
                            <div className="work-period col-md-3">
                                {e.date_start + '-' + e.date_end}
                            </div>
                            <div className="work_description col-md-6">
                                <div className="work_exp-post">{e.post}</div>
                                <div className="work_exp-company">{e.company}</div>
                                <div className='work_exp-desc_title'>Обязанности и достижения</div>
                                <div className="work_exp-desc">{e.experience_description}</div>
                            </div>
                        </div>)
                })
                    : <p>Нет опыта работы</p>}

            </div>

            <div className="educations">
                <h3 className='section_title'>Образование</h3>
                {resume.education.length ? resume.education.map((e) => {
                    return (
                        <div className="education row">
                            <div className="edu-period col-md-3">
                                Год выпуска: {resume.education[0].graduation_year}
                            </div>
                            <div className="edu_description col-md-6">
                                <div className="edu-institution">{resume.education[0].institution}</div>
                                <div className="edu-specialization">{resume.education[0].specialization}</div>
                                {/* <div className="edu-type">Тип обучения: {resume.education[0].education_type}</div> */}
                            </div>

                        </div>
                    )
                })
                    : <p>Нет образованния</p>}

            </div>

            <div className="skills">
                <h3 className='section_title'>Знания и навыки</h3>
                <div className="skill">
                    {Object.keys(resume.resumeInfo.skills).join(', ')}

                </div>
            </div>
            {/* {button == 'message' ?
                <textarea placeholder='Введите сообщение для соискателя'></textarea>
                : null}
            <button onClick={() => button == 'show' ? setButton('message') : sentResponse()} disabled={button == 'sented'} className='button resumecard__btn'>{button != 'sented' ? 'Отправить отклик' : 'Отклик отправлен'}</button> */}

        </div >

    );
}

