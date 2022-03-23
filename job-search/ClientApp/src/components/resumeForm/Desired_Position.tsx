
import React from "react";
import { useState } from "react";
import './Resume.css';
import { createTextInputs, createSelect } from '../account/createFunction'
import { ResumeType } from '../types';
import { useEffect } from "react";

export default function Desired_Position(props: { resume: ResumeType, setResume: any }) {


    useEffect(() => {
        props.resume.resumeInfo.ready_move
            ? document.getElementsByClassName('yes').defaultChecked = true
            : document.getElementsByClassName('no').defaultChecked = true
        let a = document.getElementsByName('work_type')
        for (let i = 0; i < a.length; i++) {
            if (props.resume.resumeInfo.work_type[i] === true) {
                a[i].defaultChecked = true;
            }
        }
    })

    function posthandler(e: any) {
        props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, [e.target.name]: e.target.value } });
    }

    function ratiohandler(e: any) {
        props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, ready_move: !props.resume.resumeInfo.ready_move } });
    }

    const postInfoInputs = [{ tag: 'desired_position', name: 'Должность', value: props.resume.resumeInfo.desired_position, required: false },]

    function handlerSelect(e: any) {
        props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, profession_id: e.target.selectedIndex + 1 } });
    }

    let asd = ['Программист', 'Программист', 'Инженер', 'Повар', 'Программист', 'Повар',
        'Инженер', 'Программист', 'Повар', 'Повар', 'Программист', 'Повар',
        'Программист', 'Программист', 'Программист', 'Программист', 'Программист', 'Программист',
        'Инженер', 'Программист', 'Программист', 'Повар', 'Инженер', 'Программист',]

    return (
        <section >
            <h5>Желаемая должность</h5>
            <div className='partition-2'>
                <label>Профессия</label>
                <input onChange={(e) => handlerSelect(e)} name="profession" list="professions" />
                <datalist id="professions">
                    {asd.map((e) =>
                        <option value={e} />
                    )}
                    {/* <option value="Программист" />
                    <option value="Повар" />
                    <option value="Инженер" />
                    <option value="Преподаватель" />
                    <option value="Программист" />
                    <option value="Повар" />
                    <option value="Инженер" />
                    <option value="Преподаватель" />
                    <option value="Программист" />
                    <option value="Повар" />
                    <option value="Инженер" />
                    <option value="Преподаватель" />
                    <option value="Программист" />
                    <option value="Повар" />
                    <option value="Инженер" />
                    <option value="Преподаватель" /> */}
                </datalist>
                {/* <select onChange={(e) => handlerSelect(e)}>
                    <option value='programer'>Выберете должность</option>
                    <option value='programer'>Программист</option>
                    <option value='programer'>Повар</option>
                    <option value='programer'>Инженер</option>
                    <option value='programer'>Преподаватель</option>
                </select> */}


                {createTextInputs(postInfoInputs, posthandler)}
                <label>Зарплата</label>
                <input value={props.resume.resumeInfo.desired_salary} required onChange={posthandler} min='5000' max='1000000000' name='desired_salary' type='number'></input>

                <label>Переезд</label>
                <div>
                    <div className="move_radio">
                        <input className="radio_input yes" onChange={(e) => ratiohandler(e)} required id="move_radio-1" type="radio" name="ready_move" value="yes" defaultChecked />
                        <label htmlFor="move_radio-1">Возможен</label>
                    </div>
                    <div className="move_radio">
                        <input className="radio_input no" onChange={(e) => ratiohandler(e)} required id="move_radio-2" type="radio" name="ready_move" value="no" />
                        <label htmlFor="move_radio-2">Невозможен</label>
                    </div>
                </div>
                <label>График работы</label>
                <div className='chart_block'>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="0" type='checkbox'></input> Полный рабочий день</label>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="1" type='checkbox'></input>Гибкий</label>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="2" type='checkbox'></input>Удаленная работа</label>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="3" type='checkbox'></input>Сменный</label>
                    <label> <input onChange={(e) => addTolist(e)} name='work_type' id="4" type='checkbox'></input>Вахтовая</label>
                </div>
            </div>
        </section>
    )

    function addTolist(e: any) {
        let arr = props.resume.resumeInfo.work_type.slice()
        arr[e.target.id] = !arr[e.target.id];
        props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, work_type: arr } });
    }
}