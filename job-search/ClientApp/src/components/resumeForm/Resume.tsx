
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


function Resume(props: { setResume: any, resume: ResumeType }) {
    // добавить обработчики для выборок ????
    const navigate = useNavigate();
    const [resumeInfo, setResumeInfo] = useState(props.resume);


    useEffect(() => {
        // if (props.account.user_type === 'noRegistered') {
        //     navigate('/')
        // }
    })

    function save() {
        props.setResume(resumeInfo);
        console.log(resumeInfo);
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