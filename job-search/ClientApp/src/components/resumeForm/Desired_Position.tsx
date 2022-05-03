
import React from "react";
import { useState } from "react";
import './Resume.css';
import { createTextInputs, createSelect } from '../account/createFunction'
import { ResumeType } from '../types';
import { useEffect } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { changeResumeProperty } from "../../app/resumeStateReducer";
import SearchInput from "../SearchInput";

export default function Desired_Position() {
    const resumeState: ResumeType = useSelector((state: any) => state.resumeState.resumeState)
    const dispatch = useDispatch();
    const professionState = useSelector((state: any) => state.professionState.professionState)
    useEffect(() => {
        resumeState.resumeInfo.ready_move
            ? document.getElementsByClassName('yes')[0].defaultChecked = true
            : document.getElementsByClassName('no')[0].defaultChecked = true
        let a = document.getElementsByName('work_type')
        for (let i = 0; i < a.length; i++) {
            if (JSON.parse(resumeState.resumeInfo.work_type[i]) === true) {
                a[i].defaultChecked = true;
            }
        }
        document.getElementsByClassName('professions')[0].selectedIndex = resumeState.resumeInfo.profession_id
    })

    function posthandler(e: any) {
        dispatch(changeResumeProperty({ propertyName: e.target.name, property: e.target.value }))
    }

    function ratiohandler(e: any) {
        dispatch(changeResumeProperty({ propertyName: 'ready_move', property: e.target.value == 'yes' }))
        // props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, ready_move: !props.resume.resumeInfo.ready_move } });
    }

    const postInfoInputs = [{ tag: 'desired_position', name: 'Должность', value: resumeState.resumeInfo.desired_position, required: false },]

    function professionChanged(e: number) {
        dispatch(changeResumeProperty({ propertyName: 'profession_id', property: e }))
    }


    // let asd = ['', "Программист",
    //     "Повар",
    //     "Инженер",
    //     "Бухгалтер",
    //     "Сметчик",
    //     "Экономист",
    //     "Врач",
    //     "Преподаватель",
    //     "Водитель",
    //     "Дизайнер"]

    return (
        <section >
            <h5>Желаемая должность</h5>
            <div className='partition-2'>
                <label><label><div>Профессия<span className="red">*</span></div></label></label>
                {/* <input onChange={(e) => handlerSelect(e)} name="profession" list="professions" /> */}
                <SearchInput text="Введите профессию" className='professions' items={professionState} name='profession' handler={professionChanged}></SearchInput>
                {/* <select required onChange={(e) => handlerSelect(e)} className="professions">
                    {asd.map((e) =>
                        <option>{e}</option>
                    )}
                </select> */}

                {createTextInputs(postInfoInputs, posthandler)}
                <label>Зарплата</label>
                <input value={resumeState.resumeInfo.desired_salary} onChange={posthandler} min='5000' max='1000000000' name='desired_salary' type='number'></input>

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
        let arr = resumeState.resumeInfo.work_type.slice()
        arr[e.target.id] = !arr[e.target.id];
        dispatch(changeResumeProperty({ propertyName: 'work_type', property: arr }))
        // props.setResume({ ...props.resume, resumeInfo: { ...props.resume.resumeInfo, work_type: arr } });
    }
}