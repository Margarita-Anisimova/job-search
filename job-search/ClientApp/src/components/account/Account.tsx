
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import ResumeResponses from "./resumeResponses";
import "./Account.css"
import MyResponses from "./myResponses";
import { AccountType, ResumeType, CompanyType } from '../types';
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { createEmptyCompany, createEmptyResume } from '../../exportFunctions'

function Account(props: { resume: ResumeType, setResume: any, account: AccountType, company: CompanyType, setCompany: any, }) {



    type PageType = 'profile' | 'resumeResponses' | 'myResponses';
    const userState = useSelector((state: any) => state.userState.userState)
    // const [resume, setResume] = useState<ResumeType>(createEmptyResume())
    const navigate = useNavigate();

    const [page, setPage] = useState<PageType>('profile');


    useEffect(() => {
        if (userState.user_type === 'applicant' && props.resume.resumeInfo.user_id !== userState.user_id) {
            getResume()
        } else if (userState.user_type === 'employer' && props.company.companyInfo.user_id !== userState.user_id) {
            getCompany();
        }
        // if (props.account.user_type === 'noRegistered') {
        //     navigate('/')
        // }
    })

    async function getCompany() {
        const data: CompanyType = await fetch(`company/${userState.user_id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()

                } else if (response.status === 204) {
                    return createEmptyCompany(userState.user_id);
                }
            })
        await fd(data)
        props.setCompany(data);

    }

    function fd(data: CompanyType) {
        for (let e of data.vacancies) {
            e.work_type = e.work_type.split(',')
        }
    }

    async function getResume() {
        const data = await fetch(`resume/${userState.user_id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()

                } else if (response.status === 204) {
                    return createEmptyResume(userState.user_id);
                }
            })
        await changeData(data)
        props.setResume(data);

    }

    function changeData(data) {
        if (data.resumeInfo.profession_id !== 0) {

            data.resumeInfo.work_type = data.resumeInfo.work_type.split(',')
            let t = {}
            data.resumeInfo.skills.split(',').forEach((e: string) => { t[e] = e })
            data.resumeInfo.skills = t;
        }

    }

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