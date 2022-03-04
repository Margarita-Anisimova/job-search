import React from "react";
import { useState } from "react";
import './Vacancy.css';
import { createTextInputs, createSelect } from '../resumeForm/createFunction';

export default function Desired_Applicant() {
    let [desired_applicantInfo, setdesired_applicantInfo] = useState(
        {
            position: '', profession: '', educationLevel: '', workExp: ''
        });

    function posthandler(e: any) {
        setdesired_applicantInfo({ ...desired_applicantInfo, [e.target.name]: e.target.value });
    }

    const postInfoInputs = [
        { tag: 'position', name: 'Должность', value: desired_applicantInfo.position },
        { tag: 'profession', name: 'Профессия', value: desired_applicantInfo.profession },]

    return (
        <section>
            <h5>Кого ищете?</h5>
            <div className='part part-1'>
                {createTextInputs(postInfoInputs, posthandler)}

                <label> Уровень образования</label>
                <select className="edu_level" name='educatLevel'>
                    <option>Среднее</option>
                    <option>Незаконченное высшее</option>
                    <option>Высшее</option>
                    <option>Среднее профессиональное</option>
                </select>

                <label>Стаж работы в сфере</label>
                <div>
                    <div className="workexp_radio">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="workexp_radio-1" type="radio" name="workExp" value="yes" defaultChecked />
                        <label htmlFor="workexp_radio-1">без опыта</label>
                    </div>
                    <div className="workexp_radio">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="workexp_radio-2" type="radio" name="workExp" value="no" />
                        <label htmlFor="workexp_radio-2">1-3 года</label>
                    </div>
                    <div className="workexp_radio">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="workexp_radio-3" type="radio" name="workExp" value="desirable" />
                        <label htmlFor="workexp_radio-3">3-5 лет</label>
                    </div>
                    <div className="workexp_radio">
                        <input className="radio_input" onChange={(e) => posthandler(e)} required id="workexp_radio-4" type="radio" name="workExp" value="desirable" />
                        <label htmlFor="workexp_radio-4">более 5 лет</label>
                    </div>
                </div>

            </div>
        </section>
    )
}