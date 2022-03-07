
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
            company: '', post: '', workStart: '', workEnd: '', responsibilities: '', achievements: '',
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
                                tag: 'selectContainer workStart',
                                selectNames: [{ name: 'workStart', value: props.resumeInfo.workExperience[i].workStart }]
                            }, handler)}
                            {createSelectsContainer({
                                name: 'Окончание работы',
                                tag: 'selectContainer workEnd',
                                selectNames: [{ name: 'workEnd', value: props.resumeInfo.workExperience[i].workEnd }]
                            }, handler)}
                            <label>Обязанности</label>
                            <textarea onChange={(e) => handler(e)} name="responsibilities" value={props.resumeInfo.workExperience[i].responsibilities} ></textarea>
                            <label>Достижения</label>
                            <textarea onChange={(e) => handler(e)} name='achievements' value={props.resumeInfo.workExperience[i].achievements} ></textarea>
                        </div>

                    )}
                    <button className="btn_add" type='button' onClick={addExpirience}> Добавить опыт работы</button>
                </div>
                : null}
        </section >)
}