import React, { useEffect } from "react";
import { useState } from "react";
import './Vacancy.css';
import { createTextInputs, createSelect } from '../account/createFunction';
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { getEducationLevel, getWorkExperience, getWorkType } from '../formElements'
import SearchInput from '../SearchInput'
import img from '../lamp.svg';

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


    const [profession, setprofession] = useState(props.vacancy.profession_id ? professionState[props.vacancy.profession_id - 1].name : '');
    function searchChanged(value: string) {
        professionChanged(0)
        setprofession('');
    }

    return (
        <section className="vacancy__desiredApplicant">
            <div className="vacancy__desiredApplicant_form">
                <h5>Кого ищете?</h5>
                <div className='part part-1'>
                    <label><div>Профессия<span className="red">*</span></div></label>
                    <SearchInput value={profession} setValue={setprofession} searchChanged={searchChanged} text="Введите профессию" className='profession_input' items={professionState} name='profession' handler={professionChanged}></SearchInput>

                    {createTextInputs(postInfoInputs, handler)}
                    <label> Уровень образования</label>
                    {getEducationLevel(props.vacancy.education_level, handler)}

                    <label><div>Стаж работы в сфере<span className="red">*</span></div></label>
                    {getWorkExperience(handler)}
                </div>
            </div>
            <div className="resume_desPosition_Recomendation">
                <div className="recomendation_header">
                    <img style={{ paddingRight: '5px' }} src={img} alt="" />
                    <h6 style={{ fontSize: '1.2rem' }}>Название должности</h6>
                </div>
                <h6 style={{ color: '#00B147' }}>Хорошо</h6>
                <ul>
                    <li>Привычное для резюме и вакансий таких специалистов</li>
                    <li>Из названия сразу ясно, чем предстоит заниматься</li>
                    <li>Состоит не более чем из 4 слов</li>
                </ul>
                <div className="">
                    <h6>Например</h6>
                    <ul>
                        <li>Менеджер по продажам автозапчастей</li>
                        <li>Администратор в салоне красоты</li>
                        <li>Бухгалтер по расчету зарплаты</li>
                    </ul>
                </div>

            </div>
        </section>
    )
}