
import React from "react";
import { useState } from "react";
import './Resume.css';
import { createTextInputs, createSelectsContainer } from '../account/createFunction'
import { WorkExpirienceType } from '../types'
import { ResumeType } from '../types';
import { createEmptyWorkExperience } from '../../exportFunctions'

export default function WorkExperience(props: { resume: ResumeType, setResume: any }) {

    const [hasWorkExpirience, sethasWorkExpirience] = useState(true)

    function handler(e: any) {
        let arr = props.resume.workExperience.slice()
        let id = e.target.parentElement.id || e.target.parentElement.parentElement.id
        arr[id].status = 'modify'
        arr[id][e.target.name] = e.target.value;
        props.setResume({ ...props.resume, workExperience: arr });
    }

    function addExpirience() {
        let arr = props.resume.workExperience.slice();
        arr.push(createEmptyWorkExperience(props.resume.resumeInfo.resume_id))
        props.setResume({ ...props.resume, workExperience: arr });
    }

    function deleteItem(i: number) {
        let arr = props.resume.workExperience.slice()
        arr[i].status = 'delete'
        props.setResume({ ...props.resume, workExperience: arr });
    }
    function IsWorkExperience() {
        sethasWorkExpirience(!hasWorkExpirience)
        if (!hasWorkExpirience) {
            props.setResume({ ...props.resume, workExperience: [createEmptyWorkExperience(props.resume.resumeInfo.resume_id)] });
        } else {
            props.setResume({ ...props.resume, workExperience: [] });
        }
    }

    return (
        <section>
            <h5>Опыт работы</h5>
            <label className="work_exp" >
                <input onChange={IsWorkExperience} type='checkbox'></input>
                Без опыта работы
            </label>
            {hasWorkExpirience ?
                <div>
                    {props.resume.workExperience.map((e, i) =>
                        <div id={i.toString()} className='partition-3'>
                            {i != 0 ? <button type="button" onClick={() => deleteItem(i)} className="deleteItemButton">X</button> : null}
                            {createTextInputs([
                                { tag: 'company', name: 'Компания', value: props.resume.workExperience[i].company, required: true },
                                { value: props.resume.workExperience[i].post, name: 'Должность', tag: 'post', required: true }], handler)}
                            <label>Годы работы</label>
                            <div className='data_container'>
                                <input className='data_input' value={props.resume.workExperience[i].date_start} required placeholder='Год начала'
                                    onChange={(e) => handler(e)} min={(new Date()).getFullYear() - 80} max={(new Date()).getFullYear()}
                                    name='date_start' type='number'></input>
                                <input className='data_input' value={props.resume.workExperience[i].date_end} required placeholder='Год окончания'
                                    onChange={(e) => handler(e)} min={(new Date()).getFullYear() - 80} max={(new Date()).getFullYear()}
                                    name='date_end' type='number'></input>
                            </div>
                            <label>Достижения <br></br>и обязанности</label>
                            <textarea onChange={(e) => handler(e)} name="experience_description" value={props.resume.workExperience[i].experience_description} ></textarea>

                        </div>

                    )}
                    <button className="btn_add" type='button' onClick={addExpirience}> Добавить опыт работы</button>
                </div>
                : null
            }
        </section >)
}