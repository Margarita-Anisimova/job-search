import React, { useEffect } from "react";
import { useState } from "react";
import './Vacancy.css';
import { createTextInputs, createSelect } from '../account/createFunction';
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';

export default function Desired_Applicant(props: { vacancy: VacancyType, setVacancy: any }) {

    function handler(e: any) {
        props.setVacancy({ ...props.vacancy, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        let a = document.getElementsByName('work_experience')
        for (let i = 0; i < a.length; i++) {
            if (a[i].value === props.vacancy.work_experience) {
                a[i].defaultChecked = true;
                break;
            }
        }
    })

    let asd = ['', 'Программист', 'Повар', 'Инженер']

    function handlerSelect(e: any) {
        props.setVacancy({ ...props.vacancy, profession_id: e.target.selectedIndex });
    }

    const postInfoInputs = [
        { tag: 'position', name: 'Должность', value: props.vacancy.position, required: true },]

    return (
        <section>
            <h5>Кого ищете?</h5>
            <div className='part part-1'>
                <label>Профессия</label>
                {/* <input onChange={(e) => handlerSelect(e)} name="profession" list="professions" /> */}
                <select required onChange={(e) => handlerSelect(e)} className="professions">
                    {asd.map((e) =>
                        <option>{e}</option>
                    )}
                </select>

                {createTextInputs(postInfoInputs, handler)}

                <label> Уровень образования</label>
                <select onChange={(e) => handler(e)} value={props.vacancy.education_type} className="edu_level" name='education_type'>
                    <option>Не требуется</option>
                    <option>Среднее</option>
                    <option>Незаконченное высшее</option>
                    <option>Высшее</option>
                    <option>Среднее профессиональное</option>
                </select>

                <label>Стаж работы в сфере</label>
                <div>
                    <div className="workexp_radio">
                        <input className="radio_input" onChange={(e) => handler(e)} required id="workexp_radio-1" type="radio" name="work_experience" value="без опыта" defaultChecked />
                        <label htmlFor="workexp_radio-1">без опыта</label>
                    </div>
                    <div className="workexp_radio">
                        <input className="radio_input" onChange={(e) => handler(e)} required id="workexp_radio-2" type="radio" name="work_experience" value="1-3 года" />
                        <label htmlFor="workexp_radio-2">1-3 года</label>
                    </div>
                    <div className="workexp_radio">
                        <input className="radio_input" onChange={(e) => handler(e)} required id="workexp_radio-3" type="radio" name="work_experience" value="3-5 лет" />
                        <label htmlFor="workexp_radio-3">3-5 лет</label>
                    </div>
                    <div className="workexp_radio">
                        <input className="radio_input" onChange={(e) => handler(e)} required id="workexp_radio-4" type="radio" name="work_experience" value="более 5 лет" />
                        <label htmlFor="workexp_radio-4">более 5 лет</label>
                    </div>
                </div>

            </div>
        </section>
    )
}