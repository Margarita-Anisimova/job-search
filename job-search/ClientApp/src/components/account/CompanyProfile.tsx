
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { changeCompany, deleteVacansy } from "../../app/companyStateReducer";
import { deleteVacansyFromBase } from "../baseconnect";
import { createEmptyCompany } from "../../exportFunctions";


export default function CompanyProfile() {

    const navigate = useNavigate();
    const companyState: CompanyType = useSelector((state: any) => state.companyState.companyState)
    const userState: AccountType = useSelector((state: any) => state.userState.userState)
    const dispatch = useDispatch();

    const [worker, setWorker] = useState([]);
    const [load, setLoad] = useState(false);
    const [main, setMain] = useState(false);


    function delVacansy(vacancy_id: number, index: number) {
        dispatch(deleteVacansy({ id: index }))
        deleteVacansyFromBase(vacancy_id)
    }
    const cityState = useSelector((state: any) => state.cityState.cityState)

    useEffect(() => {
        if (companyState.companyInfo.fullname && !load) {
            setLoad(true)
            getworker()
        }

    })


    async function getworker() {
        let data = await fetch(`company/${companyState.companyInfo.company_id}/${userState.user_id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
        setWorker(data.workers)
        setMain(data.main)
    }


    async function deleteCompany() {
        dispatch(changeCompany({ companyState: createEmptyCompany() }))
        const response = await fetch('company', {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(companyState.companyInfo.company_id)
        })
    }

    async function deleteWorker(user_id: number) {
        setWorker([])
        const response = await fetch('company/deleteWorker', {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(user_id)
        })
    }

    return (
        <div className="employer__container">
            <div style={{width: "60%"}}>
            <div className="vacancyInfo">
                <p className="profile_sect-title">Моя компания</p>
                {main ?
                    <NavLink className="account_link" tag={Link} to='/newEmployee'>Добавить сотрудника</NavLink> : null}
                <div className="worker_container">
                    {worker.map((worker) => {
                        return (
                            <div title="Дважды щелкнике для удаления сотрудника" onDoubleClick={(e) => deleteWorker(worker.user_id)} >
                                <p className='worker' >{worker.worker_email}</p>
                            </div>)
                    })}
                </div>
            </div>


            {
                companyState.companyInfo.fullname ?
                    <div className="user_resumes_container resumeCard">
                        <div className="card_maininfo">
                            <p className="card__title"> {companyState.companyInfo.fullname}</p>
                            <p className="card__subtitle">{cityState[companyState.companyInfo.city_id].value}</p>
                            <p className="card__desc">{companyState.companyInfo.email}</p>
                        </div>
                        <div className="card_buttons">
                        <button onClick={() => navigate('/company')} className="resumeButton">Редактировать</button>
                        {main ? <button onClick={deleteCompany} className="resumeButton">Удалить</button> : null}
                        </div>
                    </div>
                    : <NavLink className="account_link" tag={Link} to='/company'>Создать компанию</NavLink>
            }
            <div className="vacancyInfo">
                <p className="profile_sect-title">Мои вакансии</p>
                <NavLink className="account_link" tag={Link} to={'/vacancy/' + companyState.vacancies.length} >Добавить вакансию</NavLink>
            </div>

            {
                companyState.vacancies.map((vacancy, i) => {
                    return <div className='resumeCard'>
                        {vacancy.status === "del" ? <p>Заблокировано, необходимо внести изменения</p> : null}
                        <div className="card_maininfo">
                            <p className="card__title">{vacancy.position}</p>
                            <p style={{color: "#333"}} className="card__subtitle">{vacancy.salary} руб.</p>
                            <p className="card__desc">{vacancy.work_address}</p>
                        </div>
                        <div className="card_buttons">
                            <button onClick={() => navigate('/vacancy/' + i)} className="resumeButton">Редактировать</button>
                            <button onClick={() => delVacansy(vacancy.vacancy_id, i)} className="resumeButton">Удалить</button>
                        </div>
                    </div >
                })
            }
        </div >
        </div>
    );
}