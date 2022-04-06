import React, { useEffect } from "react";
import { useState } from "react";
import './Vacancy.css';
import { createTextInputs, createSelect } from '../account/createFunction';
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { getEducationLevel, getWorkExperience, getWorkType } from '../formElements'
import SearchInput from '../SearchInput'

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

    let asd = ['', "Программист",
        "Повар",
        "Инженер",
        "Бухгалтер",
        "Сметчик",
        "Экономист",
        "Врач",
        "Преподаватель",
        "Водитель",
        "Дизайнер"]

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
                <select required onChange={(e) => handlerSelect(e)} className="professions">
                    {asd.map((e) =>
                        <option>{e}</option>
                    )}
                </select>

                {createTextInputs(postInfoInputs, handler)}
                <label> Уровень образования</label>
                {getEducationLevel(props.vacancy.education_level, handler)}

                <label>Стаж работы в сфере</label>
                {getWorkExperience(handler)}
            </div>
        </section>
    )
}