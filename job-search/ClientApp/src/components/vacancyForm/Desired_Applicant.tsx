import React, { useEffect } from "react";
import { useState } from "react";
import './Vacancy.css';
import { createTextInputs, createSelect } from '../account/createFunction';
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';

export default function Desired_Applicant(props: { vacansy: VacancyType, setVacansy: any }) {
    // let [desired_applicantInfo, setdesired_applicantInfo] = useState(
    //     {
    //         position: '', profession: '', educationLevel: '', workExp: ''
    //     });

    function posthandler(e: any) {
        props.setVacansy({ ...props.vacansy, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        let a = document.getElementsByName('work_experience')
        for (let i = 0; i < a.length; i++) {
            if (a[i].value === props.vacansy.work_experience) {
                a[i].defaultChecked = true;
                break;
            }
        }
    })

    const postInfoInputs = [
        { tag: 'position', name: 'Должность', value: props.vacansy.position },
        { tag: 'profession', name: 'Профессия', value: props.vacansy.profession },]

    return (
        <section>
            <h5>Кого ищете?</h5>
            <div className='part part-1'>
                {createTextInputs(postInfoInputs, posthandler)}

                <label> Уровень образования</label>
                <select onChange={(e) => posthandler(e)} value={props.vacansy.education_type} className="edu_level" name='education_type'>
                    <option>Среднее</option>
                    <option>Незаконченное высшее</option>
                    <option>Высшее</option>
                    <option>Среднее профессиональное</option>
                </select>

                <label>Стаж работы в сфере</label>
                <div>
                    <div className="workexp_radio">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="workexp_radio-1" type="radio" name="work_experience" value="без опыта" defaultChecked />
                        <label htmlFor="workexp_radio-1">без опыта</label>
                    </div>
                    <div className="workexp_radio">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="workexp_radio-2" type="radio" name="work_experience" value="1-3 года" />
                        <label htmlFor="workexp_radio-2">1-3 года</label>
                    </div>
                    <div className="workexp_radio">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="workexp_radio-3" type="radio" name="work_experience" value="3-5 лет" />
                        <label htmlFor="workexp_radio-3">3-5 лет</label>
                    </div>
                    <div className="workexp_radio">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="workexp_radio-4" type="radio" name="work_experience" value="более 5 лет" />
                        <label htmlFor="workexp_radio-4">более 5 лет</label>
                    </div>
                </div>

            </div>
        </section>
    )
}