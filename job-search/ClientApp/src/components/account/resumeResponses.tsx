
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { useSelector } from "react-redux";
import { CompanyInfoType, VacancyType } from "../types";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";

export default function ResumeResponses() {

    type ResumeResponse = {
        vacancy: VacancyType;
        response: ResponseToResume;
    }

    type ResponseToResume = {
        vacancy_id: number;
        resume_id: number;
        message: string;
    }

    const [responses, setResponses] = useState<ResumeResponse[]>([]);
    const [loading, setLoading] = useState(false);

    const resumeState = useSelector((state: any) => state.resumeState.resumeState)
    useEffect(() => {
        if (!loading)
            getResponses()
        setLoading(true)
    })

    async function getResponses() {
        const data = await fetch(`responseToResume/${resumeState.resumeInfo.resume_id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
            })
        setResponses(data);

    }

    async function deleteResp(e: ResponseToResume, id: number) {

        const response = await fetch('responseToResume', {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(e)
        })
        let arr = responses.slice()
        arr.splice(id, 1);
        setResponses(arr)
    }

    function changeStatus(response: ResponseToResume, id: number) {
        deleteResp(response, id)
    }

    return (
        <div className='responseToResume_container'>
            {responses.map((e, id) =>
                <div className='responseToResume responseCard'>
                    <div className="myResponse_vacancy">
                        <NavLink style={{ padding: '0' }} target="_blank" rel="noopener noreferrer" tag={Link} to={"/vacancycard/" + e.vacancy.vacancy_id} >
                                {/* <p> {e.vacancy.position}</p> */}

                                <p className='card__title'>{e.vacancy.position}</p>
                                <p className='card__subtitle'>{e.vacancy.salary}</p>
                                <p className='card__address'>{e.vacancy.work_address}</p>
                        </NavLink>
                    </div>
                    <div className="myResponses_message">
                        <p>{e.response.message}</p>
                    </div>
                    <div className="myResponses_status">
                        <button onClick={() => deleteResp(e.response, id)} className="light__button light__button-small">Просмотрено</button>
                    </div>
                </div>)}
        </div>
    );
}