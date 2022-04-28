
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "reactstrap";
import { VacancyType } from "../types";
import "./Account.css"
import img from './pgfFnQm.jpg'

export default function MyResponses() {
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
        response: string;
    }

    const [loading, setLoading] = useState(false);

    function changeStatus(response: ResponseToVacancy, id: number) {
        deleteResp(response, id)
    }

    useEffect(() => {
        if (!loading)
            getResponses()
        setLoading(true)
    })

    async function getResponses() {
        const data = await fetch(`ResponseToVacancy/result/${resumeState.resumeInfo.resume_id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
            })
        setMyResponses(data);

    }

    async function deleteResp(e: ResponseToVacancy, id: number) {
        delete e.vacancy
        const response = await fetch('ResponseToVacancy', {
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
                    <div className="myResponse_vacancy">
                        <NavLink style={{ padding: '0' }} target="_blank" rel="noopener noreferrer" tag={Link} to={"/vacancycard/" + res.vacancy.vacancy_id} >
                            {/* <div className="card__container col-lg-4"> */}
                                <p className='card__title'>{res.vacancy.position}</p>
                                <p className='card__subtitle'>{res.vacancy.salary}</p>
                                {/* <p className='card__desc'>Опыт {res.vacancy.work_experience}</p> */}
                                <p className='card__address'>{res.vacancy.work_address}</p>
                            {/* </div> */}
                        </NavLink>
                    </div>
                    <div className="myResponses_message">
                        <p>{res.response.message}</p>
                    </div>

                    <div className="myResponses_status">
                        {res.response.response === 'Принято'
                            ? <p style={{ color: '#00B147' }}>{res.response.response}</p>
                            : <p style={{ color: '#333' }}>{res.response.response}</p>
                        }
                        

                        {res.response.response !== 'На рассмотрении'
                            ? <button className="light__button light__button-small" style={{ margin: '0' }} onClick={() => deleteResp(res.response, id)}>Просмотрено</button>
                            : null}
                    </div>
                    
                </div>
            })}
        </div>
    );
}