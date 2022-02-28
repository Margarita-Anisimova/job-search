
import React from "react";
import { useState } from "react";
import './Resume.css';
import { createTextInputs, createSelect } from './createFunction'

export default function Desired_Position() {
    let [desired_positionInfo, setdesired_positionInfo] = useState(
        {
            desired_position: '', profession: '', salary: '', move: ''
        });

    function posthandler(e: any) {
        setdesired_positionInfo({ ...desired_positionInfo, [e.target.name]: e.target.value });
    }

    const postInfoInputs = [{ tag: 'desired_position', name: 'Должность', value: desired_positionInfo.desired_position },
    { tag: 'profession', name: 'Профессия', value: desired_positionInfo.profession },
    { tag: 'salary', name: 'Город', value: desired_positionInfo.salary },]

    return (
        <section >
            <h5>Желаемая должность</h5>
            <div className='partition-2'>
                {createTextInputs(postInfoInputs, posthandler)}
                <label>Переезд</label>
                <div>
                    <div className="move_radio">
                        <input onChange={(e) => posthandler(e)} required id="move_radio-1" type="radio" name="move" value="yes" defaultChecked />
                        <label htmlFor="move_radio-1">Возможен</label>
                    </div>
                    <div className="move_radio">
                        <input onChange={(e) => posthandler(e)} required id="move_radio-2" type="radio" name="move" value="no" />
                        <label htmlFor="move_radio-2">Невозможен</label>
                    </div>
                    <div className="move_radio">
                        <input onChange={(e) => posthandler(e)} required id="move_radio-3" type="radio" name="move" value="desirable" />
                        <label htmlFor="move_radio-3">Желателен</label>
                    </div>
                </div>
                <label>График работы</label>
                <div className='chart_block'>

                    <label htmlFor="chart1">
                        <input id="chart1" type='checkbox'></input>
                        Полный рабочий день
                    </label>
                    <label htmlFor="chart2"> <input name='work_chart' id="chart2" type='checkbox'></input>Гибкий</label>

                    <label htmlFor="chart3"> <input name='work_chart' id="chart3" type='checkbox'></input>Удаленная работа</label>

                    <label htmlFor="chart4"> <input name='work_chart' id="chart4" type='checkbox'></input>Сменный</label>
                </div>
                <label>Тип занятости</label>
                <div className='busyness_block'>
                    <label >
                        <input type='checkbox'></input>
                        Полная
                    </label>
                    <label >
                        <input type='checkbox'></input>
                        Вахтовая
                    </label>
                    <label >
                        <input type='checkbox'></input>

                        Стажировка
                    </label>
                    <label >
                        <input type='checkbox'></input>
                        Временная работа
                    </label>
                </div>
            </div>
        </section>
    )
}