
import React from "react";
import { useState } from "react";
import './Resume.css';
import { createTextInputs, createSelect } from '../account/createFunction'
import { ResumeType } from '../types';
import { useEffect } from "react";
import Select from 'react-select';

export default function Desired_Position(props: { resume: ResumeType, setResume: any }) {


    useEffect(() => {
        props.resume.resumeInfo.ready_move
            ? document.getElementsByClassName('yes')[0].defaultChecked = true
            : document.getElementsByClassName('no')[0].defaultChecked = true
        let a = document.getElementsByName('work_type')
        for (let i = 0; i < a.length; i++) {
            if (JSON.parse(props.resume.resumeInfo.work_type[i]) === true) {
                a[i].defaultChecked = true;
            }
        }
        document.getElementsByClassName('professions')[0].selectedIndex = props.resume.resumeInfo.profession_id
    })

    function posthandler(e: any) {
        props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, [e.target.name]: e.target.value } });
    }

    function ratiohandler(e: any) {
        props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, ready_move: !props.resume.resumeInfo.ready_move } });
    }

    const postInfoInputs = [{ tag: 'desired_position', name: 'Должность', value: props.resume.resumeInfo.desired_position, required: false },]

    function handlerSelect(e: any) {
        props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, profession_id: e.target.selectedIndex } });
    }

    let asd = ['', "Программист",
        "Повар",
        "Инженер",
        "Бухгалтер",
        "Сметчик",
        "Экономист",
        "Врач",
        "Преподаватель",
        "Водитель",
        "Дизайнер"]

    return (
        <section >
            <h5>Желаемая должность</h5>
            <div className='partition-2'>
                <label><label><div>Профессия<span className="red">*</span></div></label></label>
                {/* <input onChange={(e) => handlerSelect(e)} name="profession" list="professions" /> */}
                <select required onChange={(e) => handlerSelect(e)} className="professions">
                    {asd.map((e) =>
                        <option>{e}</option>
                    )}
                </select>

                {createTextInputs(postInfoInputs, posthandler)}
                <label>Зарплата</label>
                <input value={props.resume.resumeInfo.desired_salary} onChange={posthandler} min='5000' max='1000000000' name='desired_salary' type='number'></input>

                <label><div>Переезд<span className="red">*</span></div></label>
                <div>
                    <div className="move_radio">
                        <input className="radio_input yes" onChange={(e) => ratiohandler(e)} required id="move_radio-1" type="radio" name="ready_move" value="yes" />
                        <label htmlFor="move_radio-1">Возможен</label>
                    </div>
                    <div className="move_radio">
                        <input className="radio_input no" onChange={(e) => ratiohandler(e)} required id="move_radio-2" type="radio" name="ready_move" value="no" />
                        <label htmlFor="move_radio-2">Невозможен</label>
                    </div>
                </div>
                <label><div>График работы<span className="red">*</span></div></label>
                <div className='chart_block'>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="0" type='checkbox'></input>Полный рабочий день</label>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="1" type='checkbox'></input>Гибкий</label>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="2" type='checkbox'></input>Удаленная работа</label>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="3" type='checkbox'></input>Сменный</label>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="4" type='checkbox'></input>Вахтовая</label>
                </div>
            </div>
        </section >
    )

    function addTolist(e: any) {
        let arr = props.resume.resumeInfo.work_type.slice()
        arr[e.target.id] = !arr[e.target.id];
        props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, work_type: arr } });
    }
}