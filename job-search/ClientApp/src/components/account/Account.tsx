
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Profile from "./Profile";
import ResumeResponses from "./resumeResponses";
import "./Account.css"
import MyResponses from "./myResponses";

function Account(props: { accountType: string }) {
    type PageType = 'profile' | 'resumeResponses' | 'myResponses';

    const navigate = useNavigate();

    const [page, setPage] = useState<PageType>('profile');


    // useEffect(() => {
    //     if (props.accountType === 'noRegistered') {
    //         navigate('/')
    //     }
    // })

    function createPage() {
        switch (page) {
            case 'profile': {
                return (<Profile accountType={props.accountType}></Profile>)
            }
            case 'resumeResponses': {
                return (<ResumeResponses></ResumeResponses>)
            }
            case 'myResponses': {
                return (<MyResponses></MyResponses>)
            }
            default: { break; }
        }
    }

    return (
        <div className="container">
            <div className='accountMenu'>
                <button onClick={() => setPage('profile')}>Профиль</button>
                <button onClick={() => setPage('resumeResponses')}>{props.accountType === 'applicant' ? 'Отклики на резюме' : 'Отклики на вакансии'}</button>
                {props.accountType === 'applicant' ? <button onClick={() => setPage('myResponses')}>Мои отклики</button> : null}
            </div>
            {createPage()}
        </div>
    );
}

export default Account;