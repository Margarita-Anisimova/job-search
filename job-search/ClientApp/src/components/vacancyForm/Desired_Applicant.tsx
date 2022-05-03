import React, { useEffect } from "react";
import { useState } from "react";
import './Vacancy.css';
import { createTextInputs, createSelect } from '../account/createFunction';
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { getEducationLevel, getWorkExperience, getWorkType } from '../formElements'
import SearchInput from '../SearchInput'
import { useSelector } from "react-redux";

export default function Desired_Applicant(props: { vacancy: VacancyType, setVacancy: any }) {

    function handler(e: any) {
        props.setVacancy({ ...props.vacancy, [e.target.name]: e.target.value });
    }
    const professionState = useSelector((state: any) => state.professionState.professionState)

    useEffect(() => {
        let a = document.getElementsByName('work_experience')
        for (let i = 0; i < a.length; i++) {
            if (a[i].value === props.vacancy.work_experience) {
                a[i].defaultChecked = true;
                break;
            }
        }
    })

    // let asd = ['', "Программист",
    //     "Повар",
    //     "Инженер",
    //     "Бухгалтер",
    //     "Сметчик",
    //     "Экономист",
    //     "Врач",
    //     "Преподаватель",
    //     "Водитель",
    //     "Дизайнер"]

    function professionChanged(e: number) {
        props.setVacancy({ ...props.vacancy, profession_id: e });
    }

    const postInfoInputs = [
        { tag: 'position', name: 'Должность', value: props.vacancy.position, required: true },]

    return (
        <section>
            <h5>Кого ищете?</h5>
            <div className='part part-1'>
                <label><div>Профессия<span className="red">*</span></div></label>
                <SearchInput text="Введите профессию" className='professions' items={professionState} name='profession' handler={professionChanged}></SearchInput>
                {/* <select required onChange={(e) => handlerSelect(e)} className="professions">
                    {asd.map((e) =>
                        <option>{e}</option>
                    )}
                </select> */}

                {createTextInputs(postInfoInputs, handler)}
                <label> Уровень образования</label>
                {getEducationLevel(props.vacancy.education_level, handler)}

                <label><div>Стаж работы в сфере<span className="red">*</span></div></label>
                {getWorkExperience(handler)}
            </div>
        </section>
    )
}