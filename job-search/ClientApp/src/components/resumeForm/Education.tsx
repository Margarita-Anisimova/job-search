
import React from "react";
import { useState, useEffect } from "react";
import './Resume.css';
import { createTextInputs, createSelectsContainer } from '../account/createFunction'
import { EducationType } from '../types'
import { ResumeType } from '../types';
import { createEmptyEducation } from '../../exportFunctions'

export default function Education(props: { resume: ResumeType, setResume: any }) {
    //нужно ли обновление при скрытии???
    //добавить запрет на добавление если не заполнено 1ы

    const [hasEducation, sethasEducation] = props.resume.resumeInfo.education_level === 'Нет образования' ? useState(false) : useState(true)

    function handler(e: any) {
        let arr = props.resume.education.slice()
        let id = e.target.parentElement.id || e.target.parentElement.parentElement.id
        arr[id].status = 'modify'
        arr[id][e.target.name] = e.target.value;
        props.setResume({ ...props.resume, education: arr });
    }

    useEffect(() => {
        for (let i = 0; i < props.resume.education.length; i++) {
            let a = document.getElementsByName('education_type ' + i)
            for (let j = 0; j < a.length; j++) {
                if (a[j].value === props.resume.education[i].education_type) {
                    a[j].defaultChecked = true;
                    return;
                }
            }
        }
    })


    function handlerRadio(e: any) {
        let [name, id] = e.target.name.split(' ');
        let arr = props.resume.education.slice()
        arr[id].status = 'modify'
        arr[id][name] = e.target.value;
        props.setResume({ ...props.resume, education: arr });
    }

    function addExpirience() {
        let arr = props.resume.education.slice();
        arr.push(createEmptyEducation(props.resume.resumeInfo.resume_id))
        props.setResume({ ...props.resume, education: arr });
    }

    function deleteItem(i: number) {
        let arr = props.resume.education.slice();
        arr[i].status = 'delete'
        // arr.splice(i, 1)
        props.setResume({ ...props.resume, education: arr });
    }

    function changeEdLevel(e) {
        props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, education_level: e.target.value } });
        if (e.target.value === 'Нет образования') {
            sethasEducation(false)
            props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, education_level: e.target.value }, education: [] });
        } else if (props.resume.education.length === 0) {
            sethasEducation(true)
            props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, education_level: e.target.value }, education: [createEmptyEducation(props.resume.resumeInfo.resume_id)] });
        }
    }

    // function IsEducation() {
    //     sethasEducation(!hasEducation)
    //     if (!hasEducation) {
    //         props.setResume({ ...props.resume, education: [createEmptyEducation()] });
    //     } else {
    //         props.setResume({ ...props.resume, education: [] });
    //     }
    // }

    return (
        <section className="section">
            <h5>Образование</h5>
            {/* <label className="education" >
                <input onChange={IsEducation} type='checkbox'></input>
                Нет образования
            </label> */}
            <label> Уровень образования</label>
            <select className="edu_level" name='education_level' onChange={(e) => changeEdLevel(e)} value={props.resume.resumeInfo.education_level}>
                <option>Нет образования</option>
                <option>Среднее</option>
                <option>Незаконченное высшее</option>
                <option>Высшее</option>
                <option>Среднее профессиональное</option>
            </select>
            {hasEducation ?
                <div>

                    {props.resume.education.map((e, i) => {
                        if (e.status !== 'delete') {

                            return (<div id={i.toString()} className='partition-4'>
                                {i != 0 ? <button type="button" onClick={() => deleteItem(i)} className="deleteItemButton">X</button> : null}

                                {createTextInputs([{ tag: 'institution', name: 'Учебное заведение', value: props.resume.education[i].institution, required: true },
                                { tag: 'specialization', name: 'Специальность', value: props.resume.education[i].specialization, required: true },], handler)}
                                <label>Форма обучения</label>
                                <div>
                                    <div className="edForm_radio">
                                        <input className="radio_input" required id="edForm_radio-1" onChange={(e) => handlerRadio(e)} type="radio" name={"education_type " + i} value="full-time" defaultChecked />
                                        <label htmlFor="edForm_radio-1">Очная</label>
                                    </div>
                                    <div className="edForm_radio">
                                        <input className="radio_input" required id="edForm_radio-2" onChange={(e) => handlerRadio(e)} type="radio" name={"education_type " + i} value="part-time" />
                                        <label htmlFor="edForm_radio-2">Заочная</label>
                                    </div>
                                    <div className="edForm_radio">
                                        <input className="radio_input" required id="edForm_radio-3" onChange={(e) => handlerRadio(e)} type="radio" name={"education_type " + i} value="full-time_part-time" />
                                        <label htmlFor="edForm_radio-3">Очно-заочная</label>
                                    </div>
                                </div>
                                <label>Год выпуска</label>
                                <div className='data_container'>
                                    <input className='data_input' value={props.resume.education[i].graduation_year} required
                                        onChange={(e) => handler(e)} min={(new Date()).getFullYear() - 80} max={(new Date()).getFullYear()}
                                        name='graduation_year' type='number'></input>
                                </div>

                            </div>)

                        } else {
                            return null
                        }
                    }
                    )}
                    <button className="btn_add" type='button' onClick={addExpirience}> Добавить учебное заведение</button>
                </div>
                : null}
        </section >)
}