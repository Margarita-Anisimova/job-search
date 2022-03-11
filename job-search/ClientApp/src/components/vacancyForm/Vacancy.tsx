import React from "react";
import { useState } from "react";
import { createTextInputs, createSelectsContainer } from '../account/createFunction';
import Desired_Applicant from "./Desired_Applicant";
import About_Work from "./About_Work";
// import '../../custom.css';
import './Vacancy.css';
import { CompanyType, VacancyType } from "../types";
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


function Vacancy(props: {company: CompanyType, vacancy: VacancyType, setVacancy: any}) {

    const [vacancyInfo, setVacancyInfo] = useState(props.vacancy);


    function handler(e: any) {
        setVacancyInfo({ ...vacancyInfo, [e.target.name]: e.target.value });
    }

    const commonInfoInputs = [{ tag: 'work_address', name: 'Место работы', value: vacancyInfo.work_address },]

    function save() {
        console.log(vacancyInfo);

        preparedata();
        props.setVacancy(vacancyInfo);
        console.log(vacancyInfo);

        // postNewVacancy();
    }

    function preparedata() {
        setVacancyInfo({ ...vacancyInfo, salary: Number(vacancyInfo.salary)})
        setVacancyInfo({ ...vacancyInfo, work_type: vacancyInfo.work_type.toString()})

    }

    async function postNewVacancy() {
        await fetch('vacancy', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ ...vacancyInfo, company_id: props.company.company_id })
        });
    }

    return (
        <div>
            <h4>Добавление вакансии</h4>
            <div className="vacancy_container">

                <form className="vacancy_form">

                    <Desired_Applicant vacancyInfo={vacancyInfo} setVacancyInfo={setVacancyInfo}></Desired_Applicant>
                    <About_Work vacancyInfo={vacancyInfo} setVacancyInfo={setVacancyInfo}></About_Work>
                    <section >
                        <h5>Место работы</h5>
                        <div className='part part-3'>
                            {createTextInputs(commonInfoInputs, handler)}
                        </div>
                    </section>

                    <NavLink onClick={save} tag={Link} to="/account">Сохранить</NavLink>

                </form>

            </div>
        </div>
    );
}

export default Vacancy;