import React from "react";
import { useState } from "react";
import './Vacancy.css';
import { createTextInputs, createSelect } from '../account/createFunction';
import { VacancyType } from "../types";
// import '../../custom.css';


export default function About_Work(props: {vacancyInfo: VacancyType, setVacancyInfo: any}) {

    function posthandler(e: any) {
        props.setVacancyInfo({ ...props.vacancyInfo, [e.target.name]: e.target.value });
    }

    const postInfoInputs = [
        { tag: 'salary', name: 'Зарплата', value: props.vacancyInfo.salary }];

    return (
        <section>
            <h5>О работе</h5>
            <div className='part part-2'>
                {createTextInputs(postInfoInputs, posthandler)}
                
                <label>График работы</label>
                <div className='chart_block'>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="1" type='checkbox'></input> Полный рабочий день</label>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="2" type='checkbox'></input>Гибкий</label>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="3" type='checkbox'></input>Удаленная работа</label>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="4" type='checkbox'></input>Сменный</label>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="5" type='checkbox'></input>Вахтовая</label>
                </div>

                <label>Обязанности</label>
                <textarea name="responsibilities" value={props.vacancyInfo.responsibilities} onChange={(e) => posthandler(e)}></textarea>

                <label>Требования</label>
                <textarea name="requirements" value={props.vacancyInfo.requirements} onChange={(e) => posthandler(e)}></textarea>
            </div>
        </section>
    )

    function addTolist(e: any) {
        let arr = props.vacancyInfo.work_type.slice()
        arr[e.id] = !arr[e.id];
        props.setVacancyInfo({ ...props.vacancyInfo, work_type: arr })
    }
}