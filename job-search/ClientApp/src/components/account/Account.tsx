
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import ResumeResponses from "./resumeResponses";
import "./Account.css"
import MyResponses from "./myResponses";
import { AccountType, ResumeType, CompanyType } from '../types';
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { createEmptyCompany, createEmptyResume, createEmptyAccount } from '../../exportFunctions'
import VacancyCollections from "./VacancyCollections";
import ResumeCollections from "./ResumeCollections";
import { changeUser } from "../../app/userStateReducer";
import "../../custom.css"

function Account(props: { resume: ResumeType, setResume: any, setAccount: any, account: AccountType, company: CompanyType, setCompany: any, }) {



    type PageType = 'profile' | 'resumeResponses' | 'myResponses' | 'vacancyCollections' | 'resumeCollections';
    const userState = useSelector((state: any) => state.userState.userState)
    // const [resume, setResume] = useState<ResumeType>(createEmptyResume())
    const navigate = useNavigate();

    const [page, setPage] = useState<PageType>('profile');
    const dispatch = useDispatch();

    useEffect(() => {
        if (userState.user_type === 'applicant' && props.resume.resumeInfo.user_id !== userState.user_id) {
            // getUser()
            getResume()
        } else if (userState.user_type === 'employer' && props.company.companyInfo.user_id !== userState.user_id) {
            // getUser()
            getCompany();
        }
        // if (props.account.user_type === 'noRegistered') {
        //     navigate('/')
        // }
    })

    async function getCompany() {
        const data = await fetch(`company/${userState.user_id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()

                }
            })
        props.setAccount(data.user);
        if (data.company) {
            await fd(data)
            props.setCompany(data.company);
            dispatch(changeUser({ user_id: userState.user_id, user_type: userState.user_type, fullemployer: true }))
        }

    }

    function fd(data) {
        for (let e of data.company.vacancies) {
            e.work_type = e.work_type.split(',')
        }
    }

    async function getResume() {
        const data = await fetch(`resume/${userState.user_id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()

                }
            })
        props.setAccount(data.user);
        if (data.resume) {
            await changeData(data)
            props.setResume(data.resume);
        }



    }

    function changeData(data) {
        if (data.resume.resumeInfo.profession_id !== 0) {

            data.resume.resumeInfo.work_type = data.resume.resumeInfo.work_type.split(',')
            let t = {}
            data.resume.resumeInfo.skills.split(',').forEach((e: string) => { t[e] = e })
            data.resume.resumeInfo.skills = t;
        }

    }

    function createPage() {
        switch (page) {
            case 'profile': {
                return <Profile setResume={props.setResume} setCompany={props.setCompany} account={props.account} resume={props.resume} company={props.company}></Profile >
            }
            case 'resumeResponses': {
                return (<ResumeResponses resume={props.resume} company={props.company}></ResumeResponses>)
            }
            case 'myResponses': {
                return (<MyResponses></MyResponses>)
            }
            case 'vacancyCollections': {
                return (<VacancyCollections resume={props.resume}></VacancyCollections>)
            }
            case 'resumeCollections': {
                return (<ResumeCollections company={props.company}></ResumeCollections>)
            }
            default: { break; }
        }
    }

    return (
        <div className="container">
            <div className='accountMenu'>
                <button className="light__button" onClick={() => setPage('profile')}>Профиль</button>
                {/* <button onClick={() => setPage('resumeResponses')}>{userState.user_type === 'applicant' ? 'Отклики на резюме' : 'Отклики на вакансии'}</button>
                {userState.user_type === 'applicant' ? <button onClick={() => setPage('myResponses')}>Мои отклики</button> : null} */}
                {
                    userState.user_type === 'applicant' ?
                        props.resume.resumeInfo.city ? <button className="light__button" onClick={() => setPage('vacancyCollections')}>Подборки вакансий</button> : null
                        :
                        props.company.vacancies.length ? <button className="light__button" onClick={() => setPage('resumeCollections')}>Подборки резюме</button> : null}
            </div>
            {createPage()}
        </div>
    );
}

export default Account;