
import React from "react";
import { useState } from "react";
import './Resume.css';
import { createTextInputs, createSelect } from '../account/createFunction'
import { ResumeType } from '../types';
import { useEffect } from "react";

export default function Desired_Position(props: { resumeInfo: ResumeType, setResumeInfo: any }) {
    // let [desired_positionInfo, setdesired_positionInfo] = useState({ desired_position: '', profession: '', desired_salary: '', ready_move: '', work_type: [] });

    useEffect(() => {
        let a = document.getElementsByName('ready_move')
        for (let i = 0; i < a.length; i++) {
            if (a[i].value === props.resumeInfo.ready_move) {
                a[i].defaultChecked = true;
                break;
            }
        }
        a = document.getElementsByName('work_type')
        for (let i = 0; i < a.length; i++) {
            if (props.resumeInfo.work_type[i] === true) {
                a[i].defaultChecked = true;
            }
        }
    })

    function posthandler(e: any) {
        props.setResumeInfo({ ...props.resumeInfo, [e.target.name]: e.target.value });
    }

    const postInfoInputs = [{ tag: 'desired_position', name: 'Должность', value: props.resumeInfo.desired_position },
    { tag: 'profession', name: 'Профессия', value: props.resumeInfo.profession },
    { tag: 'desired_salary', name: 'Город', value: props.resumeInfo.desired_salary },]

    return (
        <section >
            <h5>Желаемая должность</h5>
            <div className='partition-2'>
                {createTextInputs(postInfoInputs, posthandler)}
                <label>Переезд</label>
                <div>
                    <div className="move_radio">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="move_radio-1" type="radio" name="ready_move" value="yes" defaultChecked />
                        <label htmlFor="move_radio-1">Возможен</label>
                    </div>
                    <div className="move_radio">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="move_radio-2" type="radio" name="ready_move" value="no" />
                        <label htmlFor="move_radio-2">Невозможен</label>
                    </div>
                    <div className="move_radio">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="move_radio-3" type="radio" name="ready_move" value="desirable" />
                        <label htmlFor="move_radio-3">Желателен</label>
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
        let arr = props.resumeInfo.work_type.slice()
        arr[e.target.id] = !arr[e.target.id];
        props.setResumeInfo({ ...props.resumeInfo, work_type: arr })
    }
}