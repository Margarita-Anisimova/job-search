
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { useSelector } from "react-redux";
import { CompanyType, ResumeInfoType, VacancyType } from "../types";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";

export default function VacancyResponses() {

    const [responses, setResponses] = useState<ResumeResponse[]>([]);

    const companyState: CompanyType = useSelector((state: any) => state.companyState.companyState)
    const [status, setStatus] = useState(false);

    type ResumeResponse = {
        resume: ResumeInfoType;
        response: ResponseToVacancy;
    }

    type ResponseToVacancy = {
        vacancy_id: number;
        resume_id: number;
        message: string;
        response: string;
    }

    useEffect(() => {
        //  getResponses()
    })

    async function getResponses(vacancy_id: number) {
        const data = await fetch(`responseToVacancy/${vacancy_id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
            })
        setResponses(data);
        setStatus(!status);

    }
    async function sentResponse(response: ResponseToVacancy, result: string, id: number) {
        response.response = result;
        await fetch('responseToVacancy', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(response)
        })
        let arr = responses.slice()
        arr.splice(id, 1);
        setResponses(arr)
    }

    return (
        <div className='pofile_container'>
            {companyState.vacancies.map((res: VacancyType) => {
                return (
                    <div className="card__container">
                        <p className='card__title'>{res.position}</p>
                        <p className='card__subtitle'>{res.work_address}</p>
                        <p className='card__desc'>Опыт {res.work_experience}</p>
                        <p className='card__address'>{res.salary} </p>
                        <button className="light__button-small" onClick={() => status ? setStatus(!status) : getResponses(res.vacancy_id)}>Показать отклики</button>
                    </div>
                )
            })}
            <div>
                {status ?
                    <div>
                        {responses.map((res, id) => {
                            return (
                                <div>
                                    <NavLink target="_blank" rel="noopener noreferrer" tag={Link} to={"/resumecard/" + res.resume.user_id} >
                                        <div className="card__container">
                                            <p className='card__title'>{res.resume.desired_position}</p>
                                            <p className='card__subtitle'>Опыт {res.resume.work_experience}</p>
                                            <p className='card__desc'>Уровень образования {res.resume.education_level}</p>
                                            <p className='card__address'>{res.resume.desired_salary} </p>
                                        </div>
                                    </NavLink>
                                    <button onClick={() => sentResponse(res.response, 'Принято', id)}>Принять</button>
                                    <button onClick={() => sentResponse(res.response, 'Отказано', id)}>Отклонить</button>
                                </div>

                            )
                        })
                        }
                    </div>
                    : null}
            </div>
        </div>
    );
}