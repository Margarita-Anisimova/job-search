
import React from "react";
import { useState, useEffect } from "react";
import './Resume.css';
import WorkExperience from './workExperience'
import Education from './Education'
import Desired_Position from './Desired_Position'
import Skills from './skills'
import { AccountType } from '../types';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { ResumeType } from '../types';
import { createEmptyResume } from '../../exportFunctions';
import { createTextInputs, createSelectsContainer } from '../account/createFunction'
import { useSelector } from "react-redux";



function Resume(props: { setResume: any, resume: ResumeType }) {
    // добавить обработчики для выборок ????
    const navigate = useNavigate();
    // const [resumeInfo, setResumeInfo] = useState(props.resume);
    const userState = useSelector((state: any) => state.userState.userState)
    //const [birth_date, setbirth_date] = userState.user_type === 'applicant' ? useState(props.resume.resumeInfo.birth_date.split(':')) : useState([''])

    useEffect(() => {

        // if (userState.user_type === 'noRegistered') {
        //     navigate('/')
        // }

        document.getElementsByClassName(props.resume.resumeInfo.gender)[0].defaultChecked = true;
    })

    function handler(e: any) {
        props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, [e.target.name]: e.target.value } });

    }

    function handlerData(e: any) {
        let r = props.resume.resumeInfo.birth_date.split(':');
        switch (e.target.name) {
            case 'birth_day':
                r[0] = e.target.value;
                break
            case 'birth_year':
                r[2] = e.target.value;
                break
            case 'birth_month':
                r[1] = e.target.value;
        }
        props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, birth_date: r.join(':') } });
    }

    function save(e) {
        //postNewResume()
        let form = document.querySelectorAll("form")[0]
        let a = form.checkValidity()
        if (!a) {
            form.reportValidity()
            e.preventDefault()
        } else {
            postNewResume()
        }
    }

    async function postNewResume() {
        let res = {
            ...props.resume.resumeInfo, user_id: userState.user_id,
            work_type: props.resume.resumeInfo.work_type.join(','),
            skills: Object.keys(props.resume.resumeInfo.skills).join(','),
        }
        props.setResume({ ...props.resume, education: props.resume.education.filter((e) => e.status != 'delete') })
        //{ resumeInfo: res, education: props.resume.education, workExperience: props.resume.workExperience })
        const response = await fetch('resume', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ resumeInfo: res, education: props.resume.education, workExperience: props.resume.workExperience })
        })
    }



    const commonInfoInputs =
        [{ tag: 'city', name: 'Город', value: props.resume.resumeInfo.city, required: true },
        { tag: 'citizenship', name: 'Гражданство', value: props.resume.resumeInfo.citizenship, required: false },]

    function getDataPart(ind: number): string {
        return props.resume.resumeInfo.birth_date.split(':')[ind]
    }

    return (
        <div className='resume_container'>
            <form className='resume_form'>
                <h5>Основное</h5>
                <div className='partition-1'>
                    <label>Дата рождения</label>
                    <div className='data_container'>
                        <input className='data_input' value={getDataPart(0)} required placeholder='День' onChange={handlerData} min='1' max='12' name='birth_day' type='number'></input>
                        <input className='data_input' value={getDataPart(1)} required placeholder='Месяц' onChange={handlerData} min='1' max='31' name='birth_month' type='number'></input>
                        <input className='data_input' value={getDataPart(2)} required placeholder='Год' onChange={handlerData} min={(new Date()).getFullYear() - 100} max={(new Date()).getFullYear() - 14} name='birth_year' type='number'></input>
                    </div>

                    {createTextInputs(commonInfoInputs, handler)}
                    <label>Пол</label>
                    <div>
                        <div className="gender_radio">
                            <input className="radio_input male" onChange={(e) => handler(e)} required id="gender_radio-1" type="radio" name="gender" value="male" defaultChecked />
                            <label htmlFor="gender_radio-1">Мужской</label>
                        </div>
                        <div className="gender_radio">
                            <input className="radio_input female" onChange={(e) => handler(e)} required id="gender_radio-2" type="radio" name="gender" value="female" />
                            <label htmlFor="gender_radio-2">Женский</label>
                        </div>
                    </div>
                </div>
                <Desired_Position resume={props.resume} setResume={props.setResume}></Desired_Position>
                <WorkExperience resume={props.resume} setResume={props.setResume}></WorkExperience>
                <Education resume={props.resume} setResume={props.setResume}></Education>
                <Skills resumeInfo={props.resume} setResumeInfo={props.setResume}></Skills>
                {/* <button>Сохранить</button> */}
                <div className="button-form">
                    <NavLink onClick={(e) => save(e)} tag={Link} to="/account">Сохранить</NavLink>
                </div>
            </form>
        </div >
    );
}

export default Resume;