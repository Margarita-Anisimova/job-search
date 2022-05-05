import React, { useEffect } from "react";
import { useState } from "react";
import './Vacancy.css';
import { createTextInputs, createSelect } from '../account/createFunction';
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
// import '../../custom.css';
import img from '../lamp.svg';



export default function About_Work(props: { vacancy: VacancyType, setVacancy: any }) {

    function handler(e: any) {
        props.setVacancy({ ...props.vacancy, [e.target.name]: e.target.value });
    }

    const postInfoInputs = [
        { tag: 'work_address', name: 'Место работы', value: props.vacancy.work_address, required: true },
    ];


    useEffect(() => {
        let a = document.getElementsByName('work_type')
        for (let i = 0; i < a.length; i++) {
            if (JSON.parse(props.vacancy.work_type[i]) === true) {
                a[i].defaultChecked = true;
            }
        }
        // document.getElementsByClassName('professions')[0].selectedIndex = props.vacancy.profession_id
    })

    function addTolist(e: any) {
        let arr = props.vacancy.work_type.slice()
        arr[e.target.id] = !arr[e.target.id];
        props.setVacancy({ ...props.vacancy, work_type: arr });
    }

    return (
        <section className="vacancy_aboutWork">
            <div className="vacancy_aboutWork_Form">
                <h5>О работе</h5>
                <div className='part part-2'>
                    {createTextInputs(postInfoInputs, handler)}
                    <label><div>Зарплата<span className="red">*</span></div></label>
                    <input value={props.vacancy.salary} onChange={handler} required min='5000' max='1000000000' name='salary' type='number'></input>
                    <label>График работы</label>
                    <div className='chart_block'>
                        <label> <input onChange={(e) => addTolist(e)} name='work_type' id="0" type='checkbox'></input>Полный рабочий день</label>
                        <label> <input onChange={(e) => addTolist(e)} name='work_type' id="1" type='checkbox'></input>Гибкий</label>
                        <label> <input onChange={(e) => addTolist(e)} name='work_type' id="2" type='checkbox'></input>Удаленная работа</label>
                        <label> <input onChange={(e) => addTolist(e)} name='work_type' id="3" type='checkbox'></input>Сменный</label>
                        <label> <input onChange={(e) => addTolist(e)} name='work_type' id="4" type='checkbox'></input>Вахтовая</label>
                    </div>

                    <label><div>Обязанности<span className="red">*</span></div></label>
                    <textarea name="responsibilities" value={props.vacancy.responsibilities} onChange={(e) => handler(e)} required maxLength="200"></textarea>

                    <label><div>Требования<span className="red">*</span></div></label>
                    <textarea name="requirements" value={props.vacancy.requirements} onChange={(e) => handler(e)} required maxLength="200"></textarea>

                </div>
            </div>
            <div className="vacancy_aboutWork_Recomentations">
                <div className="recomendation_header">
                    <img style={{ paddingRight: '5px' }} src={img} alt="" />
                    <h6 style={{ fontSize: '1.2rem' }}>Краткое описание вакансии</h6>
                </div>
                
                {/* <p>Например, «PR-менеджер», «Сотрудник службы охраны», «Специалист по защите информации»</p>
                <p>Можно указать несколько должностей в смежных сферах деятельности</p> */}
                <div className="recomendation_mainInfo">
                    <h6 style={{ fontSize: '1.2rem', marginBottom: '10px'  }}>Обязанности</h6>
                    <p>Формулируйте обязанности максимально просто, коротко и корректно</p>
                    <h6 style={{color: '#00B147'}}>Например</h6>
                    <ul>
                        <li>Техподдержка пользователей</li>
                        <li>Оформление документации по учету персонала</li>
                        <li>Обслуживание оргтехники</li>
                    </ul>

                    <h6 style={{ fontSize: '1.2rem', marginBottom: '10px'}}>Требования</h6>
                    <p>Укажите ключевые требования к кандидату</p>
                    <h6 style={{color: '#00B147'}}>Например</h6>
                    <ul>
                        <li>Грамотная речь</li>
                        <li>Уверенные навыки работы с ПК</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}