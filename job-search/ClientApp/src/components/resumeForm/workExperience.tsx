
import React from "react";
import { useState } from "react";
import './Resume.css';
import { createTextInputs, createSelectsContainer } from '../account/createFunction'
import { WorkExpirienceType } from '../types'
import { ResumeType } from '../types';

export default function WorkExperience(props: { resumeInfo: ResumeType, setResumeInfo: any }) {
    //нужно ли обновление при скрытии???
    //добавить запрет на добавление если не заполнено 1ы

    const [hasWorkExpirience, sethasWorkExpirience] = useState(true)

    function handler(e: any) {
        let arr = props.resumeInfo.workExperience.slice()
        let id = e.target.parentElement.id || e.target.parentElement.parentElement.id
        arr[id][e.target.name] = e.target.value;
        props.setResumeInfo({ ...props.resumeInfo, workExperience: arr });
    }

    function addExpirience() {
        let arr = props.resumeInfo.workExperience.slice();
        arr.push({
            work_experience_id: 0,
            company: '',
            post: '',
            date_start: '1950',
            date_end: '1950',
            experience_description: '',
        })
        props.setResumeInfo({ ...props.resumeInfo, workExperience: arr });
    }

    function deleteItem(i: number) {
        let arr = props.resumeInfo.workExperience.slice()
        arr.splice(i, 1)
        props.setResumeInfo({ ...props.resumeInfo, workExperience: arr });
    }

    return (
        <section>
            <h5>Опыт работы</h5>
            <label className="work_exp" >
                <input onChange={() => sethasWorkExpirience(!hasWorkExpirience)} type='checkbox'></input>
                Без опыта работы
            </label>
            {hasWorkExpirience ?
                <div>
                    {props.resumeInfo.workExperience.map((e, i) =>
                        <div id={i.toString()} className='partition-3'>
                            {i != 0 ? <button type="button" onClick={() => deleteItem(i)} className="deleteItemButton">X</button> : null}
                            {createTextInputs([{ tag: 'company', name: 'Компания', value: props.resumeInfo.workExperience[i].company },
                            { value: props.resumeInfo.workExperience[i].post, name: 'Должность', tag: 'post' }], handler)}
                            {createSelectsContainer({
                                name: 'Начало работы',
                                tag: 'selectContainer date_start',
                                selectNames: [{ name: 'date_start', value: props.resumeInfo.workExperience[i].date_start }]
                            }, handler)}
                            {createSelectsContainer({
                                name: 'Окончание работы',
                                tag: 'selectContainer date_end',
                                selectNames: [{ name: 'date_end', value: props.resumeInfo.workExperience[i].date_end }]
                            }, handler)}
                            <label>Достижения и обязанности</label>
                            <textarea onChange={(e) => handler(e)} name="experience_description" value={props.resumeInfo.workExperience[i].experience_description} ></textarea>

                        </div>

                    )}
                    <button className="btn_add" type='button' onClick={addExpirience}> Добавить опыт работы</button>
                </div>
                : null}
        </section >)
}