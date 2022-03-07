import React from "react";
import { useState } from "react";
import { createTextInputs, createSelectsContainer } from '../account/createFunction';
import Desired_Applicant from "./Desired_Applicant";
import About_Work from "./About_Work";
// import '../../custom.css';
import './Vacancy.css';


function Vacancy() {

    const [commonInfo, setCommonInfo] = useState(
        {
            work_address: '', vacancy_description: ''
        }
    );


    function handler(e: any) {
        setCommonInfo({ ...commonInfo, [e.target.name]: e.target.value });
    }

    const commonInfoInputs = [{ tag: 'work_address', name: 'Место работы', value: commonInfo.work_address },]

    return (
        <div>
            <h4>Добавление вакансии</h4>
            <div className="vacancy_container">

                <form className="vacancy_form">

                    <Desired_Applicant></Desired_Applicant>
                    <About_Work></About_Work>
                    <section >
                        <h5>Место работы</h5>

                        <div className='part part-3'>
                            {createTextInputs(commonInfoInputs, handler)}
                        </div>
                    </section>

                    <section >
                        <h5>Дополнительное описание</h5>

                        <div className='part-4'>
                            <label>Дополнительное описание</label>
                            <textarea name="vacancy_description" value={commonInfo.vacancy_description} onChange={(e) => handler(e)}></textarea>
                        </div>
                    </section>

                </form>

            </div>
        </div>
    );
}

export default Vacancy;