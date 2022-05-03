
import React from "react";
import { useState } from "react";
import './Resume.css';
import { createTextInputs, createSelectsContainer } from '../account/createFunction'
import { WorkExpirienceType } from '../types'
import { ResumeType } from '../types';
import { createEmptyWorkExperience } from '../../exportFunctions'
import { useDispatch, useSelector } from "react-redux";
import { addEdWork, changeEdWorkProperty, deleteAllEdWork } from "../../app/resumeStateReducer";
import img from '../lamp.svg';


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
        <section className="resume__workExp">
            <div className="resume_workExp_Form">
                <h5>Опыт работы</h5>
                <label className="exp_check" >
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
            </div>
            <div className="resume_workExp_Recomendation">
                <div className="recomendation_header">
                    <img style={{ paddingRight: '5px' }} src={img} alt="" />
                    <h6 style={{ fontSize: '1.2rem' }}>Опыт работы</h6>
                </div>
                <p style={{ marginBottom: '20px' }}>Укажите опыт работы в компании, официальное и неофициальное трудоустройство, стажировки и практики</p>


                <div className="">
                    <h6 style={{ fontSize: '1.2rem', marginBottom: '10px'  }}>Обязанности</h6>
                    <p>Опишите, какие обязанности у вас были в этой компании, что именно вы делали</p>
                    <h6 style={{color: '#00B147'}}>Например</h6>
                    <ul>
                        <li>Ежемесячно составляла бюджет доходов и расходов в программе «1С Предприятие 8.0»</li>
                        <li>Оформление документации по учету персонала</li>
                        <li>Разработка плана для отдела продаж</li>
                    </ul>

                    <h6 style={{ fontSize: '1.2rem', marginBottom: '10px'}}>Достижения</h6>
                    <p>Расскажите о ваших профессиональных успехах</p>
                    <h6 style={{color: '#00B147'}}>Например</h6>
                    <ul>
                        <li>За время моей работы в компании уровень продаж климатической техники вырос на 170%</li>
                        <li>В течение года база постоянных клиентов выросла вдвое</li>
                    </ul>

                </div>
            </div>
            
        </section >)
}