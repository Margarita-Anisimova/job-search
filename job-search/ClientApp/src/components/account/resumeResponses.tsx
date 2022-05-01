
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { useSelector } from "react-redux";
import { CompanyInfoType, VacancyType } from "../types";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { getDate } from "../../exportFunctions";

export default function ResumeResponses() {

    type ResumeResponse = {
        vacancy: VacancyType;
        response: ResponseToResume;
    }

    type ResponseToResume = {
        vacancy_id: number;
        resume_id: number;
        message: string;
        publication_date: string;
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
        <div className='pofile_container'>
            {responses.map((e, id) =>
                <div className='responseToResume'>
                    <NavLink target="_blank" rel="noopener noreferrer" tag={Link} to={"/vacancycard/" + e.vacancy.vacancy_id} >
                        <div>
                            <p> {e.vacancy.position}</p>
                        </div></NavLink>
                    <p>{e.response.message}</p>
                    <div className="resumeButtons">
                        <button onClick={() => deleteResp(e.response, id)} className="resumeButton">Просмотрено</button>
                    </div>
                    <p className='publication_date'>{getDate(e.response.publication_date)}</p>
                </div>)}
        </div>
    );
}