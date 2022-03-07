
import React from "react";
import { useState } from "react";
import './Resume.css';
import { createTextInputs, createSelect } from '../account/createFunction'
import { EducationType } from '../types'
import { ResumeType } from '../types';

export default function Education(props: { resumeInfo: ResumeType, setResumeInfo: any }) {
    //нужно ли обновление при скрытии???
    //добавить запрет на добавление если не заполнено 1ы
    const [education, setEducation] = useState<EducationType[]>(
        [{
            edlevel: '',
            university: '',
            faculty: '',
            specialization: '',
            edForm: '',
            edStart: '',
            edEnd: '',
        }]
    );

    const [hasEducation, sethasEducation] = useState(true)

    function handler(e: any) {
        let arr = education.slice()
        let id = e.target.parentElement.id || e.target.parentElement.parentElement.id
        arr[id][e.target.name] = e.target.value;
        setEducation(arr);
    }


    function handlerRadio(e: any) {
        let [name, id] = e.target.name.split(' ');
        let arr = education.slice()
        arr[id][name] = e.target.value;
        setEducation(arr);
    }

    function addExpirience() {
        let arr = education.slice();
        arr.push({
            edlevel: '',
            university: '',
            faculty: '',
            specialization: '',
            edForm: '',
            edStart: '',
            edEnd: '',
        })
        setEducation(arr)
    }

    function deleteItem(i: number) {
        let arr = education.slice()
        arr.splice(i, 1)
        setEducation(arr)
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
                    <select className="edu_level" name='educatLevel'>
                        <option>Среднее</option>
                        <option>Незаконченное высшее</option>
                        <option>Высшее</option>
                        <option>Среднее профессиональное</option>
                    </select>
                    {education.map((e, i) =>
                        <div id={i.toString()} className='partition-4'>
                            {i != 0 ? <button type="button" onClick={() => deleteItem(i)} className="deleteItemButton">X</button> : null}

                            {createTextInputs([{ tag: 'university', name: 'Учебное заведение', value: education[i].university },
                            { tag: 'faculty', name: 'Факультет', value: education[i].faculty },
                            { tag: 'specialization', name: 'Специальность', value: education[i].specialization },], handler)}
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
                            <label>Период обучения</label>
                            <div className="edPeriod">
                                <select name='edStart' onChange={(e) => handler(e)} className='dataselect'>
                                    {createSelect(1990, 2022)}
                                </select>
                                <select name='edEnd' onChange={(e) => handler(e)} className='dataselect'>
                                    {createSelect(1990, 2022)}
                                </select>
                            </div>
                        </div>

                    )}
                    <button className="btn_add" type='button' onClick={addExpirience}> Добавить учебное заведение</button>
                </div>
                : null}
        </section >)
}