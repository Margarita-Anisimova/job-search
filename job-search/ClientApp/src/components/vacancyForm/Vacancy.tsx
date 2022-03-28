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
    const id = parseInt(location.pathname.split('/')[2])
    const [vacancy, setVacancy] = props.company.vacancies[id] ? useState(props.company.vacancies[id]) : useState(createEmptyVacancy(id, props.company.companyInfo.company_id))
    // const [commonInfo, setCommonInfo] = r ? useState<VacancyType>(r) : useState<VacancyType>(createEmptyVacancy());

    function handler(e: any) {
        setVacancy({ ...vacancy, [e.target.name]: e.target.value })
    }

    function save(e: any) {
        let form = document.querySelectorAll("form")[0]
        let a = form.checkValidity()
        if (!a) {
            form.reportValidity()
            e.preventDefault()
        } else {
            let arr = props.company.vacancies.slice()
            arr[id] = vacancy
            props.setCompany({ ...props.company, vacancies: arr })
            if (vacancy.vacancy_id === 0) {
                postNewVacancy();
            } else {
                putVacancy();
            }
        }

    }

    async function postNewVacancy() {
        let a = {
            ...vacancy,
            work_type: vacancy.work_type.join(','),
        }
        const response = await fetch('vacancy', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(a)
        })
    }


    async function putVacancy() {
        let a = {
            ...vacancy,
            work_type: vacancy.work_type.join(','),
        }
        const response = await fetch('vacancy', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(a)
        })
    }

    return (
        <div>
            <h4>Добавление вакансии</h4>
            <div className="vacancy_container">

                <form className="vacancy_form">

                    <Desired_Applicant vacancy={vacancy} setVacancy={setVacancy}></Desired_Applicant>
                    <About_Work vacancy={vacancy} setVacancy={setVacancy} ></About_Work>
                    <section >
                        <h5>Дополнительное описание</h5>

                        {/* <div className='part-4'>
                            <label>Дополнительное описание</label>
                            <textarea name="vacancy_description" value={props.company.vacancies[id].vacancy_description} onChange={(e) => handler(e)}></textarea>
                        </div> */}
                    </section>
                    <NavLink onClick={save} tag={Link} to="/account">Сохранить</NavLink>
                </form>

            </div>
        </div >
    );
}

export default Vacancy;