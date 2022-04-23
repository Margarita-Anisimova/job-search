
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { useSelector } from "react-redux";
import { CompanyInfoType, VacancyType } from "../types";

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

    const resumeState = useSelector((state: any) => state.resumeState.resumeState)
    useEffect(() => {
        getResponses()
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
        <div className='pofile_container'>

            {responses.map((e, id) => {
                return <div className="responseCard">
                    <p>{e.vacancy.position}</p>
                    <p>{e.response.message}</p>

                    <div className="resumeButtons">
                        <button onClick={() => deleteResp(e.response, id)} className="resumeButton">Просмотрено</button>
                    </div>
                </div>
            })}
        </div>
    );
}