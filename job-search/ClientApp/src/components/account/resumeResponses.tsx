
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { AccountType, ResumeType, CompanyType } from '../types';
import { useSelector } from "react-redux";

export default function ResumeResponses() {

    type ResponseType = {
        company_id: string;
        resume_id: string;
        company: string;
        message: string;
    }

    const [responses, setResponses] = useState<ResponseType[]>([]);

    const userState = useSelector((state: any) => state.userState.userState)
    useEffect(() => {
        // getResponses()
    })



    async function getResponses() {
        const data = await fetch(`responseToResume/${userState.user_id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
            })
        setResponses(data);

    }

    async function deleteResp(e) {

        const response = await fetch('responseToResume', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(e)
        })
        const data = await response.json();
        // dispatch(changeUser({ user_id: data.user_id, user_type: data.user_type }))
        //   props.setAccount({ ...props.account, user_id: data.user_id })
    }


    return (
        <div className='pofile_container'>

            {responses.map((e) => {
                return <div className="responseCard">
                    <p>{e.company}</p>
                    <p>{e.message}</p>

                    <div className="resumeButtons">
                        <button onClick={(e) => deleteResp(e)} className="resumeButton">Удалить</button>
                    </div>
                </div>
            })}
        </div>
    );
}