
import React from "react";
import { useState } from "react";
import './Resume.css';
import { createTextInputs, createSelectsContainer } from '../account/createFunction'
import { WorkExpirienceType } from '../types'
import { ResumeType } from '../types';
import { createEmptyWorkExperience } from '../../exportFunctions'
import { useDispatch, useSelector } from "react-redux";
import { addEdWork, changeEdWorkProperty, deleteAllEdWork } from "../../app/resumeStateReducer";

export default function WorkExperience() {

    const resumeState: ResumeType = useSelector((state: any) => state.resumeState.resumeState)
    const dispatch = useDispatch();

    const [hasWorkExpirience, sethasWorkExpirience] = useState(true)

    function handler(e: any) {
        //  let arr = resumeState.workExperience.slice()
        let id = e.target.parentElement.id || e.target.parentElement.parentElement.id
        // arr[id].status = 'modify'
        // arr[id][e.target.name] = e.target.value;
        // props.setResume({ ...resumeState, workExperience: arr });

        dispatch(changeEdWorkProperty({ propName: 'workExperience', index: id, propertyName: e.target.name, property: e.target.value }))
    }

    function addExpirience() {
        // let arr = resumeState.workExperience.slice();
        // arr.push(createEmptyWorkExperience(resumeState.resumeInfo.resume_id))
        // props.setResume({ ...resumeState, workExperience: arr });

        dispatch(addEdWork({ propName: 'workExperience', resume_id: resumeState.resumeInfo.resume_id }))
    }

    function deleteItem(i: number) {
        // let arr = resumeState.workExperience.slice()
        // arr[i].status = 'delete'
        // props.setResume({ ...resumeState, workExperience: arr });

        dispatch(changeEdWorkProperty({ propName: 'workExperience', index: i, propertyName: 'status', property: 'delete' }))
    }
    function IsWorkExperience() {
        sethasWorkExpirience(!hasWorkExpirience)
        if (!hasWorkExpirience) {
            dispatch(addEdWork({ propName: 'workExperience', resume_id: resumeState.resumeInfo.resume_id }))
            // props.setResume({ ...resumeState, workExperience: [createEmptyWorkExperience(resumeState.resumeInfo.resume_id)] });
        } else {
            dispatch(deleteAllEdWork({ propName: 'workExperience' }))
            // props.setResume({ ...resumeState, workExperience: [] });
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
                    {resumeState.workExperience.map((e, i) =>
                        <div id={i.toString()} className='partition-3'>
                            {i != 0 ? <button type="button" onClick={() => deleteItem(i)} className="deleteItemButton">X</button> : null}
                            {createTextInputs([
                                { tag: 'company', name: 'Компания', value: resumeState.workExperience[i].company, required: true },
                                { value: resumeState.workExperience[i].post, name: 'Должность', tag: 'post', required: true }], handler)}
                            <label><div>Годы работы<span className="red">*</span></div></label>
                            <div className='data_container'>
                                <input className='data_input' value={resumeState.workExperience[i].date_start} required placeholder='Год начала'
                                    onChange={(e) => handler(e)} min={(new Date()).getFullYear() - 80} max={(new Date()).getFullYear()}
                                    name='date_start' type='number'></input>
                                <input className='data_input' value={resumeState.workExperience[i].date_end} required placeholder='Год окончания'
                                    onChange={(e) => handler(e)} min={(new Date()).getFullYear() - 80} max={(new Date()).getFullYear()}
                                    name='date_end' type='number'></input>
                            </div>
                            <label>Достижения <br></br>и обязанности</label>
                            <textarea onChange={(e) => handler(e)} name="experience_description" value={resumeState.workExperience[i].experience_description} ></textarea>

                        </div>

                    )}
                    <button className="btn_add" type='button' onClick={addExpirience}> Добавить опыт работы</button>
                </div>
                : null
            }
        </section >)
}