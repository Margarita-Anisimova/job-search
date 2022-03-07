import React from "react";
import { useState } from "react";
import { createTextInputs, createSelectsContainer } from '../account/createFunction';
import Desired_Applicant from "./Desired_Applicant";
import About_Work from "./About_Work";
// import '../../custom.css';

import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Vacancy.css';
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { useLocation } from 'react-router-dom'
import { createEmptyVacancy } from '../../exportFunctions'



function Vacancy(props: { company: CompanyType, setCompany: any }) {

    let location = useLocation();
    const id = location.pathname.split('/')[2]
    const [commonInfo, setCommonInfo] = props.company.vacancies[id] || useState<VacancyType>(createEmptyVacancy());

    function handler(e: any) {
        setCommonInfo({ ...commonInfo, [e.target.name]: e.target.value });
    }

    const commonInfoInputs = [{ tag: 'work_address', name: 'Место работы', value: commonInfo.work_address },]

    function save() {
        let arr = props.company.vacancies.slice()
        arr[id] = commonInfo;
        props.setCompany({ ...props.company, vacancies: arr })
    }

    return (
        <div>
            <h4>Добавление вакансии</h4>
            <div className="vacancy_container">

                <form className="vacancy_form">

                    <Desired_Applicant vacansy={commonInfo} setVacansy={setCommonInfo}></Desired_Applicant>
                    <About_Work vacansy={commonInfo} setVacansy={setCommonInfo}></About_Work>
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
                    <NavLink onClick={save} tag={Link} to="/account">Сохранить</NavLink>
                </form>

            </div>
        </div>
    );
}

export default Vacancy;