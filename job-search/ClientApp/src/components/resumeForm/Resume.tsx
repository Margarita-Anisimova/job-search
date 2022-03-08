
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
        props.setResume(resumeInfo, resumeInfo.user_id = props.account.user_id);

        setformInfo(
        {
            user_id: resumeInfo.user_id,
            city: resumeInfo.city,

            citizenship: resumeInfo.citizenship, 
            birth_date: resumeInfo.birth_date, 
            desired_position: resumeInfo.desired_position,
            desired_salary: resumeInfo.desired_salary, 
            ready_move: resumeInfo.ready_move, 
            skills:resumeInfo.skills, 
            profession: resumeInfo.profession,
        }
        );
        console.log(formInfo);
        postNewResume();
    }

    async function postNewResume() {
        await fetch('Resume', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ ...formInfo })
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