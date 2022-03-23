
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import ResumeResponses from "./resumeResponses";
import "./Account.css"
import MyResponses from "./myResponses";
import { AccountType, ResumeType, CompanyType } from '../types';
import Profile from "./Profile";
import { useSelector } from "react-redux";

function Account(props: { account: AccountType, resume: ResumeType, company: CompanyType, setCompany: any }) {

    type PageType = 'profile' | 'resumeResponses' | 'myResponses';
    const userState = useSelector((state: any) => state.userState.userState)
    const navigate = useNavigate();

    const [page, setPage] = useState<PageType>('profile');


    useEffect(() => {

        // if (props.account.user_type === 'noRegistered') {
        //     navigate('/')
        // }
    })

    function createPage() {
        switch (page) {
            case 'profile': {
                return <Profile setCompany={props.setCompany} account={props.account} resume={props.resume} company={props.company}></Profile >
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
        <div>
            <div className='accountMenu'>
                <button onClick={() => setPage('profile')}>Профиль</button>
                <button onClick={() => setPage('resumeResponses')}>{userState.user_type === 'applicant' ? 'Отклики на резюме' : 'Отклики на вакансии'}</button>
                {userState.user_type === 'applicant' ? <button onClick={() => setPage('myResponses')}>Мои отклики</button> : null}
            </div>
            {createPage()}
        </div>
    );
}

export default Account;