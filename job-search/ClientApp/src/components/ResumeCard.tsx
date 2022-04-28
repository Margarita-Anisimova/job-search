import * as React from 'react';
import { useState, useEffect } from 'react';
import './ResumeCard.css';
import '../custom.css';
import '../media.css';
import { EducationType, ResumeType, WorkExpirienceType, CompanyType, AccountType } from './types';
import { useLocation } from 'react-router-dom';
import { createEmptyAccount, createEmptyResume } from '../exportFunctions';
import { Redirect } from 'react-router';
import img from './account/noavatar.svg'
import { useSelector } from 'react-redux';
import ResumeResponseDialog from './ResumeResponseDialog';


export default function ResumeCard() {
    const companyState: CompanyType = useSelector((state: any) => state.companyState.companyState)
    let location = useLocation();
    const id = parseInt(location.pathname.split('/')[2])
    const [resume, setResume] = useState<ResumeType>(createEmptyResume())
    const [account, setAccount] = useState<AccountType>(createEmptyAccount())
    const [IsContacts, setIsContacts] = useState(false)
    const workType = ['Полный рабочий день', 'Гибкий', 'Удаленная работа', 'Сменный', 'Вахтовая']
    const [profession, setProfession] = useState('')
    const [button, setButton] = useState<'start' | 'sented'>('start');

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });
        if (resume.resumeInfo.resume_id == 0) {
            getResume()
        }
    })

    const [ing, setIng] = useState<string | ArrayBuffer | null>(img)


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
        setIng("data:image/jpeg;base64," + data.image);
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


    function openDialog() {
        if (companyState.vacancies.length == 0) {
            alert("Необходимо добавить вакансию")
        } else
            document.getElementsByClassName('dialog')[0].showModal();
    }

    function checkUser() {
        if (!companyState.companyInfo.fullname) {
            alert('Контакты доступны только работодателям, создавшим компанию!!!')
        } else {
            setIsContacts(true)
        }
    }

    return (
        <div className="container resumecard__container">

            <div className="resumecard__title row">
                <div className="resumecard__title-img col-lg-2 col-md-3 col-sm-4 col-4">
                    <img src={ing} className='avatar'></img>
                </div>
                <div className="resumecard__title-maininfo col-lg-4 col-md-5 col-sm-8 col-8">
                    <div className="user_name">{account.f_name + ' ' + account.l_name}</div>
                    {/* <div className="user_birthday">{resume.resumeInfo.birth_date}</div> */}
                    <div className="user_city">{resume.resumeInfo.city}</div>
                    <div className="user_citizenship"> {'Гражданство ' + resume.resumeInfo.citizenship}</div>
                </div>
                <div className="resumecard__title-buttons col-lg-3 col-md-4">
                    <button className='button resumecard__btn'>Отправить отклик</button>
                    <button onClick={() => checkUser()} className='resumecard__btn-light'>Показать контакты</button>
                    {IsContacts ?
                        <div className="resumecard__contactinfo">
                            {account.phone_number ?
                                <div className="resumecard__phone">{account.phone_number}</div>
                                : null}
                            <div className="resumecard__email">{account.email}</div>
                        </div>
                        : null}
                </div>
            </div>

            <div className="desired_profession">
                <div className='desired_profession__name'>{resume.resumeInfo.desired_position}</div>
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
                            <div className="work-period col-md-3 col-sm-4 col-3">
                                {e.date_start + '-' + e.date_end}
                            </div>
                            <div className="work_description col-md-6 col-sm-8 col-9">
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
                            <div className="edu-period col-md-3 col-sm-4 col-3">
                                {resume.resumeInfo.education_level} <br></br>
                                Год выпуска: {resume.education[0].graduation_year}
                            </div>
                            <div className="edu_description col-md-6 col-sm-8 col-9">
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
            {createResponseField()}


        </div >

    );

    function createResponseField() {
        if (companyState.companyInfo.fullname) {
            return (
                <div>
                    {/* {button == 'start'
                        ? 
                        : null} */}

                    <button onClick={() => openDialog()} disabled={button == 'sented'} className='button resumecard__btn'>
                        {button != 'sented' ? 'Отправить отклик' : 'Отклик отправлен'}
                    </button>
                    <ResumeResponseDialog resume={resume} setButton={setButton}></ResumeResponseDialog>
                </div>)
        } else
            return null;
    }
}

