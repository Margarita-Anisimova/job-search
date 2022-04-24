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
import { useDispatch, useSelector } from "react-redux";
import { changeVacancy } from "../../app/companyStateReducer";



function Vacancy() {

    const companyState: CompanyType = useSelector((state: any) => state.companyState.companyState)
    const dispatch = useDispatch();

    let location = useLocation();
    const id = parseInt(location.pathname.split('/')[2])
    const [vacancy, setVacancy] = companyState.vacancies[id] ? useState(companyState.vacancies[id]) : useState(createEmptyVacancy(0, companyState.companyInfo.company_id))
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
            // let arr = companyState.vacancies.slice()
            // arr[id] = vacancy
            // props.setCompany({ ...companyState, vacancies: arr })
            dispatch(changeVacancy({ index: id, vacancy: vacancy }))
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
                    <div className="button-form">
                        <NavLink onClick={save} tag={Link} to="/account">Сохранить</NavLink>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default Vacancy;