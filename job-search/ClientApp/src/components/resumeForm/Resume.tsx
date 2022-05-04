
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
import { useDispatch, useSelector } from "react-redux";
import { changeResume, changeResumeProperty } from "../../app/resumeStateReducer";
import SearchInput from "../SearchInput";



function Resume() {
    // добавить обработчики для выборок ????
    const navigate = useNavigate();
    const userState: AccountType = useSelector((state: any) => state.userState.userState)
    const resumeState: ResumeType = useSelector((state: any) => state.resumeState.resumeState)
    //const [birth_date, setbirth_date] = userState.user_type === 'applicant' ? useState(resumeState.resumeInfo.birth_date.split(':')) : useState([''])
    const dispatch = useDispatch();

    useEffect(() => {

        // if (userState.user_type === 'noRegistered') {
        //     navigate('/')
        // }

        document.getElementsByClassName(resumeState.resumeInfo.gender)[0].defaultChecked = true;
    })

    function handler(e: any) {
        dispatch(changeResumeProperty({ propertyName: e.target.name, property: e.target.value }))
    }

    // function handlerData(e: any) {
    //     let r = resumeState.resumeInfo.birth_date.split(':');
    //     switch (e.target.name) {
    //         case 'birth_day':
    //             r[0] = e.target.value;
    //             break
    //         case 'birth_year':
    //             r[2] = e.target.value;
    //             break
    //         case 'birth_month':
    //             r[1] = e.target.value;
    //     }
    //     props.setResume({ ...resumeState, resumeInfo: { ...resumeState.resumeInfo, birth_date: r.join(':') } });
    // }

    function save(e: any) {
        //postNewResume()
        let form = document.querySelectorAll("form")[0]
        let a = form.checkValidity()
        if (!a) {
            form.reportValidity()
            e.preventDefault()
        } else {
            if (resumeState.resumeInfo.resume_id === 0) {
                postNewResume();
            } else {
                putResume();
            }
        }
    }

    async function postNewResume() {
        let res = {
            ...resumeState.resumeInfo, user_id: userState.user_id,
            work_type: resumeState.resumeInfo.work_type.join(','),
            skills: Object.keys(resumeState.resumeInfo.skills).join(','),
            user: null,
            status: "add"
        }
        dispatch(changeResume({ resumeState: { ...resumeState, resumeInfo: { ...resumeState.resumeInfo, status: "add" }, education: resumeState.education.filter((e) => e.status != 'delete') } }))

        const response = await fetch('resume', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ ...resumeState, resumeInfo: res })
        })
    }

    async function putResume() {
        let res = {
            ...resumeState.resumeInfo,
            work_type: resumeState.resumeInfo.work_type.join(','),
            skills: Object.keys(resumeState.resumeInfo.skills).join(','),
            user: null,
        }
        dispatch(changeResume({ resumeState: { ...resumeState, education: resumeState.education.filter((e) => e.status != 'delete') } }))
        const response = await fetch('resume', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ ...resumeState, resumeInfo: res })
        })
    }


    function cityChanged(value: number) {
        dispatch(changeResumeProperty({ propertyName: 'city_id', property: value }))
    }

    const commonInfoInputs =
        // [{ tag: 'city', name: 'Город', value: resumeState.resumeInfo.city, required: true },
        [{ tag: 'citizenship', name: 'Гражданство', value: resumeState.resumeInfo.citizenship, required: false },]

    // function getDataPart(ind: number): string {
    //     return resumeState.resumeInfo.birth_date.split(':')[ind]
    // }
    const cityState = useSelector((state: any) => state.cityState.cityState)

    function searchChanged(value: string) {
        cityChanged(0)
        setcity('')
    }
    const [city, setcity] = useState(resumeState.resumeInfo.city_id ? cityState[resumeState.resumeInfo.city_id - 1].name : '');
    return (
        <div className='resume_container'>
            <form className='resume_form'>
                <h5>Основное</h5>
                <div className='partition-1'>
                    {/* <label>Дата рождения</label>
                    <div className='data_container'>
                        <input className='data_input' value={getDataPart(0)} required placeholder='День' onChange={handlerData} min='1' max='12' name='birth_day' type='number'></input>
                        <input className='data_input' value={getDataPart(1)} required placeholder='Месяц' onChange={handlerData} min='1' max='31' name='birth_month' type='number'></input>
                        <input className='data_input' value={getDataPart(2)} required placeholder='Год' onChange={handlerData} min={(new Date()).getFullYear() - 100} max={(new Date()).getFullYear() - 14} name='birth_year' type='number'></input>
                    </div> */}
                    <label><label><div>Город<span className="red">*</span></div></label></label>
                    <SearchInput value={city} setValue={setcity} searchChanged={searchChanged} text="Введите город" className='city_input' items={cityState} name='city' handler={cityChanged}></SearchInput>
                    {createTextInputs(commonInfoInputs, handler)}
                    <label><div>Пол<span className="red">*</span></div></label>
                    <div>
                        <div className="gender_radio">
                            <input className="radio_input male" onChange={(e) => handler(e)} required id="gender_radio-1" type="radio" name="gender" value="male" />
                            <label htmlFor="gender_radio-1">Мужской</label>
                        </div>
                        <div className="gender_radio">
                            <input className="radio_input female" onChange={(e) => handler(e)} required id="gender_radio-2" type="radio" name="gender" value="female" />
                            <label htmlFor="gender_radio-2">Женский</label>
                        </div>
                    </div>
                </div>
                <Desired_Position></Desired_Position>
                <WorkExperience></WorkExperience>
                <Education></Education>
                <Skills></Skills>
                {/* <button>Сохранить</button> */}
                <div className="button-form">
                    <NavLink onClick={(e) => save(e)} tag={Link} to="/account">Сохранить</NavLink>
                </div>
            </form>
        </div >
    );
}

export default Resume;