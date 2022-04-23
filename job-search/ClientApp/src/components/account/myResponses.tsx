
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "reactstrap";
import { VacancyType } from "../types";
import "./Account.css"
import img from './pgfFnQm.jpg'

export default function myResponses() {
    const resumeState = useSelector((state: any) => state.resumeState.resumeState)
    const [myResponses, setMyResponses] = useState<ResponseForApplicant[]>([])

    type ResponseForApplicant = {
        vacancy: VacancyType;
        response: ResponseToVacancy;
    }

    type ResponseToVacancy = {
        vacancy_id: number;
        resume_id: number;
        message: string;
        response: boolean;
    }

    function changeStatus(response: ResponseToVacancy, id: number) {
        deleteResp(response, id)
    }

    useEffect(() => {
        getResponses()
    })

    async function getResponses() {
        const data = await fetch(`responseToVacancy/result/${resumeState.resumeInfo.resume_id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
            })
        setMyResponses(data);

    }

    async function deleteResp(e: ResponseToVacancy, id: number) {

        const response = await fetch('responseToVacancy', {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(e)
        })
        let arr = myResponses.slice()
        arr.splice(id, 1);
        setMyResponses(arr)
    }

    return (
        <div className='myResponses_container'>
            {myResponses.map((res, id) => {
                return <div className="responseCard">
                    <NavLink target="_blank" rel="noopener noreferrer" tag={Link} to={"/vacancycard/" + res.vacancy.vacancy_id} >
                        <div className="card__container">
                            <p className='card__title'>{res.vacancy.position}</p>
                            <p className='card__subtitle'>{res.vacancy.work_address}</p>
                            <p className='card__desc'>Опыт {res.vacancy.work_experience}</p>
                            <p className='card__address'>{res.vacancy.salary}</p>
                        </div>
                    </NavLink>
                    <p>{res.response.response}</p>

                    <p>Сообщение</p>
                    <p>{res.response.message}</p>
                    <button onClick={() => changeStatus(res.response, id)}>Просмотрено</button>
                </div>
            })}
        </div>
    );
}