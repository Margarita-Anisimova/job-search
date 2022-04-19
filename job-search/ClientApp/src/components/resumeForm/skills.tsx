
import React from "react";
import { useState } from "react";
import './skills.css';
import { createTextInputs, createSelect } from '../account/createFunction'
import { EducationType } from '../types'
import { ResumeType } from '../types';
import { useDispatch, useSelector } from "react-redux";
import { changeResumeProperty, addSkill, deleteSkill } from "../../app/resumeStateReducer";

export default function Skills() {

    const resumeState: ResumeType = useSelector((state: any) => state.resumeState.resumeState)
    const dispatch = useDispatch();


    function addItem(e: any) {
        // let arr = {}
        // Object.assign(arr, resumeState.resumeInfo.skills);
        // arr[e.value] = e.value
        // props.setResumeInfo({ ...resumeState, resumeInfo: { ...resumeState.resumeInfo, skills: arr } });

        dispatch(addSkill({ name: e.value }))

    }

    function keypress(key: number) {
        if (key === 13) {
            let a = document.querySelectorAll('.inputForSkill')[0];
            addItem(a)
            a.value = '';
        }
    }

    function delSkill(e: any) {
        // let arr = {}
        // Object.assign(arr, resumeState.resumeInfo.skills);
        // delete arr[e.target.innerText]
        // props.setResumeInfo({ ...resumeState, resumeInfo: { ...resumeState.resumeInfo, skills: arr } });

        dispatch(deleteSkill({ name: e.target.innerText }))
    }

    return (
        <section className='skills_container'>
            <h5>Профессиональные навыки</h5>

            <div className='slected_skills_container'>
                {Object.keys(resumeState.resumeInfo.skills).map((e, i) =>
                    <span id={i.toString()} onDoubleClick={(e) => delSkill(e)} className="skillItem">
                        {e}
                    </span>
                )}
            </div>

            {/* <button className='selectionButton' onClick={(e) => setSelection(!selection)} type='button'>Подобрать навык</button> */}

            <input className='inputForSkill' onKeyDown={(e) => keypress(e.keyCode)} type='text'></input>

            {/* {selection ?
                <div className='selectionWindow'>
                    <button type="button" onClick={() => close()} className="closeButton">X</button>
                    <select onChange={(e) => setSkillsList(skillsLib[e.target.value])} className='selectiondatalist' id="list1">
                        {selectionList.map((e) =>
                            <option value={e}>{e}</option>
                        )}
                    </select>
                    <div>
                        {skillsList.map((sk) => <button type="button" value={sk} onClick={(e) => addItem(e.target)}>{sk}</button>)}
                    </div>

                </div>
                : null} */}

        </section >)
}