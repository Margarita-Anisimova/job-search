import React, { useEffect } from "react";
import { useState } from "react";
import './Vacancy.css';
import { createTextInputs, createSelect } from '../account/createFunction';
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
// import '../../custom.css';


export default function About_Work(props: { vacansy: VacancyType, setVacansy: any }) {
    // let [about_workInfo, setabout_workInfo] = useState(
    //     {
    //         salary: '', requirements: '', responsibilities: '',
    //     }
    // );

    function posthandler(e: any) {
        props.setVacansy({ ...props.vacansy, [e.target.name]: e.target.value });
    }

    const postInfoInputs = [
        { tag: 'salary', name: 'Зарплата', value: props.vacansy.salary }];


    useEffect(() => {
        let a = document.getElementsByName('work_type')
        for (let i = 0; i < a.length; i++) {
            if (a[i].value === props.vacansy.work_type) {
                a[i].defaultChecked = true;
                break;
            }
        }
    })

    return (
        <section>
            <h5>О работе</h5>
            <div className='part part-2'>
                {createTextInputs(postInfoInputs, posthandler)}

                <label>График работы</label>
                <div>
                    <div className="work_type">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="work_type-1" type="radio" name="work_type" value="Полный рабочий день" defaultChecked />
                        <label htmlFor="work_type-1">Полный рабочий день</label>
                    </div>
                    <div className="work_type">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="work_type-2" type="radio" name="work_type" value="Гибкий" />
                        <label htmlFor="work_type-2">Гибкий</label>
                    </div>
                    <div className="work_type">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="work_type-3" type="radio" name="work_type" value="Удаленная работа" />
                        <label htmlFor="work_type-3">Удаленная работа</label>
                    </div>
                    <div className="work_type">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="work_type-4" type="radio" name="work_type" value="Сменный" />
                        <label htmlFor="work_type-4">Сменный</label>
                    </div>
                    <div className="work_type">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="work_type-4" type="radio" name="work_type" value="Вахтовая" />
                        <label htmlFor="work_type-4">Вахтовая</label>
                    </div>
                </div>

                <label>Обязанности</label>
                <textarea name="responsibilities" value={props.vacansy.responsibilities} onChange={(e) => posthandler(e)}></textarea>

                <label>Требования</label>
                <textarea name="requirements" value={props.vacansy.requirements} onChange={(e) => posthandler(e)}></textarea>





            </div>
        </section>
    )
}