
import React from "react";
import { useState, useEffect } from "react";
import './Resume.css';
import { createTextInputs, createSelectsContainer } from '../account/createFunction'
import { EducationType } from '../types'
import { ResumeType } from '../types';
import { createEmptyEducation } from '../../exportFunctions'
import { useDispatch, useSelector } from "react-redux";
import { addEdWork, changeEdWorkProperty, changeResumeProperty, deleteAllEdWork } from "../../app/resumeStateReducer";

export default function Education() {
    //нужно ли обновление при скрытии???
    //добавить запрет на добавление если не заполнено 1ы
    const resumeState: ResumeType = useSelector((state: any) => state.resumeState.resumeState)
    const dispatch = useDispatch();

    const [hasEducation, sethasEducation] = resumeState.resumeInfo.education_level === 'Нет образования' ? useState(false) : useState(true)

    function handler(e: any) {
        // let arr = resumeState.education.slice()
        let id = e.target.parentElement.id || e.target.parentElement.parentElement.id
        // arr[id].status = 'modify'
        // arr[id][e.target.name] = e.target.value;
        // props.setResume({ ...resumeState, education: arr });
        dispatch(changeEdWorkProperty({ propName: 'education', index: id, propertyName: e.target.name, property: e.target.value }))
    }

    useEffect(() => {
        for (let i = 0; i < resumeState.education.length; i++) {
            let a = document.getElementsByName('education_type ' + i)
            for (let j = 0; j < a.length; j++) {
                if (a[j].value === resumeState.education[i].education_type) {
                    a[j].defaultChecked = true;
                    return;
                }
            }
        }
    })


    function handlerRadio(e: any) {
        let [name, id] = e.target.name.split(' ');
        // let arr = resumeState.education.slice()
        // arr[id].status = 'modify'
        // arr[id][name] = e.target.value;
        // props.setResume({ ...resumeState, education: arr });

        dispatch(changeEdWorkProperty({ propName: 'education', index: id, propertyName: name, property: e.target.value }))
    }

    function addExpirience() {
        // let arr = resumeState.education.slice();
        // arr.push(createEmptyEducation(resumeState.resumeInfo.resume_id))
        // props.setResume({ ...resumeState, education: arr });

        dispatch(addEdWork({ propName: 'education', resume_id: resumeState.resumeInfo.resume_id }))
    }

    function deleteItem(i: number) {
        // let arr = resumeState.education.slice();
        // arr[i].status = 'delete'
        // // arr.splice(i, 1)
        // props.setResume({ ...resumeState, education: arr });

        dispatch(changeEdWorkProperty({ propName: 'education', index: i, propertyName: 'status', property: 'delete' }))
    }

    function changeEdLevel(e) {
        dispatch(changeResumeProperty({ propertyName: 'education_level', property: e.target.value }))
        if (e.target.value === 'Нет образования') {
            sethasEducation(false)
            dispatch(deleteAllEdWork({ propName: 'education' }))
            // props.setResume({ ...resumeState, resumeInfo: { ...resumeState.resumeInfo, education_level: e.target.value }, education: [] });
        } else if (resumeState.education.length === 0) {
            sethasEducation(true)
            dispatch(addEdWork({ propName: 'education', resume_id: resumeState.resumeInfo.resume_id }))
        }

        // props.setResume({ ...resumeState, resumeInfo: { ...resumeState.resumeInfo, education_level: e.target.value } });
        // if (e.target.value === 'Нет образования') {
        //     sethasEducation(false)
        //     props.setResume({ ...resumeState, resumeInfo: { ...resumeState.resumeInfo, education_level: e.target.value }, education: [] });
        // } else if (resumeState.education.length === 0) {
        //     sethasEducation(true)
        //     props.setResume({ ...resumeState, resumeInfo: { ...resumeState.resumeInfo, education_level: e.target.value }, education: [createEmptyEducation(resumeState.resumeInfo.resume_id)] });
        // }
    }

    // function IsEducation() {
    //     sethasEducation(!hasEducation)
    //     if (!hasEducation) {
    //         props.setResume({ ...resumeState, education: [createEmptyEducation()] });
    //     } else {
    //         props.setResume({ ...resumeState, education: [] });
    //     }
    // }

    return (
        <section className="resume_educations">
            <div className="resume_educations_Form">
                <h5>Образование</h5>
                {/* <label className="education" >
                    <input onChange={IsEducation} type='checkbox'></input>
                    Нет образования
                </label> */}
                <label><div>Уровень образования<span className="red">*</span></div></label>
                <select className="edu_level" name='education_level' onChange={(e) => changeEdLevel(e)} value={resumeState.resumeInfo.education_level}>
                    <option>Нет образования</option>
                    <option>Среднее</option>
                    <option>Незаконченное высшее</option>
                    <option>Высшее</option>
                    <option>Среднее профессиональное</option>
                </select>
                {hasEducation ?
                    <div>

                        {resumeState.education.map((e, i) => {
                            if (e.status !== 'delete') {

                                return (<div id={i.toString()} className='partition-4'>
                                    {i != 0 ? <button type="button" onClick={() => deleteItem(i)} className="deleteItemButton">X</button> : null}

                                    {createTextInputs([{ tag: 'institution', name: 'Учебное заведение', value: resumeState.education[i].institution, required: true },
                                    { tag: 'specialization', name: 'Специальность', value: resumeState.education[i].specialization, required: true },], handler)}
                                    <label><div>Форма обучения<span className="red">*</span></div></label>
                                    <div>
                                        <div className="edForm_radio">
                                            <input className="radio_input" required id="edForm_radio-1" onChange={(e) => handlerRadio(e)} type="radio" name={"education_type " + i} value="full-time" defaultChecked />
                                            <label htmlFor="edForm_radio-1">Очная</label>
                                        </div>
                                        <div className="edForm_radio">
                                            <input className="radio_input" required id="edForm_radio-2" onChange={(e) => handlerRadio(e)} type="radio" name={"education_type " + i} value="part-time" />
                                            <label htmlFor="edForm_radio-2">Заочная</label>
                                        </div>
                                        <div className="edForm_radio">
                                            <input className="radio_input" required id="edForm_radio-3" onChange={(e) => handlerRadio(e)} type="radio" name={"education_type " + i} value="full-time_part-time" />
                                            <label htmlFor="edForm_radio-3">Очно-заочная</label>
                                        </div>
                                    </div>
                                    <label><div>Год выпуска<span className="red">*</span></div></label>
                                    <div className='data_container'>
                                        <input className='data_input' value={resumeState.education[i].graduation_year} required
                                            onChange={(e) => handler(e)} min={(new Date()).getFullYear() - 80} max={(new Date()).getFullYear()}
                                            name='graduation_year' type='number'></input>
                                    </div>

                                </div>)

                            } else {
                                return null
                            }
                        }
                        )}
                        <button className="btn_add" type='button' onClick={addExpirience}> Добавить учебное заведение</button>
                    </div>
                    : null}
            </div>
            <div className="resume_educations_Recomendations">
                {/* <p>dkmckdmckd</p>
                <p>dmckdmckdmc</p> */}
            </div>
        </section >)
}