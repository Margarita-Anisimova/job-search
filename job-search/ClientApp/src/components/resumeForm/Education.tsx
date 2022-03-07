
import React from "react";
import { useState, useEffect } from "react";
import './Resume.css';
import { createTextInputs, createSelectsContainer } from '../account/createFunction'
import { EducationType } from '../types'
import { ResumeType } from '../types';

export default function Education(props: { resumeInfo: ResumeType, setResumeInfo: any }) {
    //нужно ли обновление при скрытии???
    //добавить запрет на добавление если не заполнено 1ы

    const [hasEducation, sethasEducation] = useState(true)

    function handler(e: any) {
        let arr = props.resumeInfo.education.slice()
        let id = e.target.parentElement.id || e.target.parentElement.parentElement.id
        arr[id][e.target.name] = e.target.value;
        props.setResumeInfo({ ...props.resumeInfo, education: arr });
    }

    useEffect(() => {
        for (let i = 0; i < props.resumeInfo.education.length; i++) {
            let a = document.getElementsByName('edForm ' + i)
            for (let j = 0; j < a.length; j++) {
                if (a[j].value === props.resumeInfo.education[i].education_type) {
                    a[j].defaultChecked = true;
                    return;
                }
            }
        }
    })


    function handlerRadio(e: any) {
        let [name, id] = e.target.name.split(' ');
        let arr = props.resumeInfo.education.slice()
        arr[id][name] = e.target.value;
        props.setResumeInfo({ ...props.resumeInfo, education: arr });
    }

    function addExpirience() {
        let arr = props.resumeInfo.education.slice();
        arr.push({
            education_id: 0,
            institution: '',
            faculty: '',
            specialization: '',
            resume_id: 0,
            education_type: 'full-time',
            graduation_year: '1950',
        })
        props.setResumeInfo({ ...props.resumeInfo, education: arr });
    }

    function deleteItem(i: number) {
        let arr = props.resumeInfo.education.slice();
        arr.splice(i, 1)
        props.setResumeInfo({ ...props.resumeInfo, education: arr });
    }

    function changeEdLevel(e) {
        props.setResumeInfo({ ...props.resumeInfo, education_level: e.target.value });
    }

    return (
        <section className="section">
            <h5>Образование</h5>
            <label className="education" >
                <input onChange={() => sethasEducation(!hasEducation)} type='checkbox'></input>
                Нет образования
            </label>

            {hasEducation ?
                <div>
                    <label> Уровень образования</label>
                    <select className="edu_level" name='education_level' onChange={(e) => changeEdLevel(e)} value={props.resumeInfo.education_level}>
                        <option>Среднее</option>
                        <option>Незаконченное высшее</option>
                        <option>Высшее</option>
                        <option>Среднее профессиональное</option>
                    </select>
                    {props.resumeInfo.education.map((e, i) =>
                        <div id={i.toString()} className='partition-4'>
                            {i != 0 ? <button type="button" onClick={() => deleteItem(i)} className="deleteItemButton">X</button> : null}

                            {createTextInputs([{ tag: 'institution', name: 'Учебное заведение', value: props.resumeInfo.education[i].institution },
                            { tag: 'faculty', name: 'Факультет', value: props.resumeInfo.education[i].faculty },
                            { tag: 'specialization', name: 'Специальность', value: props.resumeInfo.education[i].specialization },], handler)}
                            <label>Форма обучения</label>
                            <div>
                                <div className="edForm_radio">
                                    <input className="radio_input" required id="edForm_radio-1" onChange={(e) => handlerRadio(e)} type="radio" name={"edForm " + i} value="full-time" defaultChecked />
                                    <label htmlFor="edForm_radio-1">Очная</label>
                                </div>
                                <div className="edForm_radio">
                                    <input className="radio_input" required id="edForm_radio-2" onChange={(e) => handlerRadio(e)} type="radio" name={"edForm " + i} value="part-time" />
                                    <label htmlFor="edForm_radio-2">Заочная</label>
                                </div>
                                <div className="edForm_radio">
                                    <input className="radio_input" required id="edForm_radio-3" onChange={(e) => handlerRadio(e)} type="radio" name={"edForm " + i} value="full-time_part-time" />
                                    <label htmlFor="edForm_radio-3">Очно-заочная</label>
                                </div>
                            </div>
                            {createSelectsContainer({
                                name: 'Год выпуска',
                                tag: 'selectContainer graduation_year',
                                selectNames: [{ name: 'graduation_year', value: props.resumeInfo.education[i].graduation_year }]
                            }, handler)}
                        </div>

                    )}
                    <button className="btn_add" type='button' onClick={addExpirience}> Добавить учебное заведение</button>
                </div>
                : null}
        </section >)
}