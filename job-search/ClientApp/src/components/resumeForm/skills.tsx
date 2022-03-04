
import React from "react";
import { useState } from "react";
import './skills.css';
import { createTextInputs, createSelect } from './createFunction'
import { EducationType } from '../types'

export default function Skills() {
    const skillsLib = {
        backend: ['C#', 'Pyton', 'Java'],
        frontend: ['JavaScript', 'HTML', 'React', 'CSS'],
        android: ['Android Studio', 'Java'],
    }

    const [skills, setSkills] = useState([]);
    // const [skillsList, setSkillsList] = useState([]);
    // const selectionList = ['Специализация', ...Object.keys(skillsLib)];
    // const [selection, setSelection] = useState(false)



    // function close() {
    //     setSelection(false);
    // }

    function addItem(e: any) {
        let arr = skills.slice()
        arr.push(e.value)
        setSkills(arr);

    }

    function keypress(key: number) {
        if (key === 13) {
            let a = document.querySelectorAll('.inputForSkill')[0];
            addItem(a)
            a.value = '';
        }
    }

    function delSkill(e: any) {
        let arr = skills.slice()
        arr.splice(e.target.id, 1)
        setSkills(arr)
    }

    return (
        <section className='skills_container'>
            <h5>Профессиональные навыки</h5>

            <div className='slected_skills_container'>
                {skills.map((e, i) =>
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