
import React from "react";
import { useState } from "react";
import './Resume.css';
import { createTextInputs, createSelectsContainer } from './createFunction'
import WorkExperience from './workExperience'
import { WorkExpirienceType } from '../types'
import Education from './Education'
import Desired_Position from './Desired_Position'
import Skills from './skills'


function Resume() {
    // добавить обработчики для выборок ????
    const [commonInfo, setCommonInfo] = useState(
        {
            name: '', f_name: '', city: '', citizenship: '', birth_day: '', birth_month: '', birth_year: '', gender: ''
        }
    );


    function handler(e: any) {
        setCommonInfo({ ...commonInfo, [e.target.name]: e.target.value });
    }

    const commonInfoInputs = [{ tag: 'f_name', name: 'Фамилия', value: commonInfo.f_name },
    { tag: 'name', name: 'Имя', value: commonInfo.name },
    { tag: 'city', name: 'Город', value: commonInfo.city },
    { tag: 'citizenship', name: 'Гражданство', value: commonInfo.citizenship },]

    return (
        <div className='resume_container'>
            <form className='resume_form'>

                <section >
                    <h5>Основная информация</h5>

                    <div className='partition-1'>
                        {createTextInputs(commonInfoInputs, handler)}

                        {createSelectsContainer({ name: 'Дата рождения', tag: 'selectContainer burth', selectNames: ['birth_year', 'birth_month', 'birth_day'] }, handler)}
                        <label>Пол</label>
                        <div>
                            <div className="gender_radio">
                                <input className="radio_input" onChange={(e) => handler(e)} required id="gender_radio-1" type="radio" name="gender" value="men" defaultChecked />
                                <label htmlFor="gender_radio-1">Мужской</label>
                            </div>
                            <div className="gender_radio">
                                <input className="radio_input" onChange={(e) => handler(e)} required id="gender_radio-2" type="radio" name="gender" value="women" />
                                <label htmlFor="gender_radio-2">Женский</label>
                            </div>
                        </div>
                    </div>
                </section>

                <Desired_Position></Desired_Position>
                <WorkExperience ></WorkExperience>
                <Education></Education>
                <Skills></Skills>
            </form>
        </div >
    );
}

export default Resume;