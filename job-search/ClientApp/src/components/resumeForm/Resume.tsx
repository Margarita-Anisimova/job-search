
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


function Resume(props: {account: AccountType, setResume: any, resume: ResumeType }) {
    // добавить обработчики для выборок ????
    const navigate = useNavigate();
    const [resumeInfo, setResumeInfo] = useState(props.resume);
    const [educationInfo, setEducationInfo] = useState(resumeInfo.education);
    const [workExperienceInfo, setWorkExperienceInfo] = useState(resumeInfo.workExperience);

    const [formInfo, setformInfo] = useState({ user_id: 0, city: '', citizenship:'', birth_date: '', desired_position: '', desired_salary: '', ready_move: '', skills: '', profession: ''})
    


    useEffect(() => {
        // if (props.account.user_type === 'noRegistered') {
        //     navigate('/')
        // }
    })

    function save() {
        // setResumeInfo({resumeInfo.user_id: props.account.user_id})
        props.setResume(resumeInfo, resumeInfo.user_id= props.account.user_id);
        console.log(resumeInfo);
        postNewResume();
        // postNewEducation();
    }

    async function postNewResume() {
        await fetch('ResumeType', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ ...resumeInfo})

            // body: JSON.stringify({ resumeInfo, user_id: props.account.user_id, city: props.resume.city })
        });
    }

    return (
        <div className='resume_container'>
            <form className='resume_form'>

                <Desired_Position resumeInfo={resumeInfo} setResumeInfo={setResumeInfo}></Desired_Position>
                <WorkExperience resumeInfo={resumeInfo} setResumeInfo={setResumeInfo}></WorkExperience>
                <Education resumeInfo={resumeInfo} setResumeInfo={setResumeInfo}></Education>
                <Skills resumeInfo={resumeInfo} setResumeInfo={setResumeInfo}></Skills>
                <NavLink onClick={save} tag={Link} to="/account">Сохранить</NavLink>
            </form>
        </div >
    );
}

export default Resume;