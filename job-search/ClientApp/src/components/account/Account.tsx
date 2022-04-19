
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
import VacancyResponses from "../VacancyResponses";

function Account() {


    type PageType = 'profile' | 'resumeResponses' | 'myResponses' | 'vacancyCollections' | 'resumeCollections' | 'vacancyResponses';
    const userState: AccountType = useSelector((state: any) => state.userState.userState)
    const resumeState: ResumeType = useSelector((state: any) => state.resumeState.resumeState)
    const companyState: CompanyType = useSelector((state: any) => state.companyState.companyState)
    const navigate = useNavigate();

    const [page, setPage] = useState<PageType>('profile');
    const dispatch = useDispatch();

    function createPage() {
        switch (page) {
            case 'profile': {
                return <Profile></Profile >
            }
            case 'resumeResponses': {
                return (<ResumeResponses></ResumeResponses>)
            }
            case 'vacancyResponses': {
                return (<VacancyResponses></VacancyResponses>)
            }
            // case 'myResponses': {
            //     return (<MyResponses></MyResponses>)
            // }
            case 'vacancyCollections': {
                return (<VacancyCollections></VacancyCollections>)
            }
            case 'resumeCollections': {
                return (<ResumeCollections></ResumeCollections>)
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
                        resumeState.resumeInfo.resume_id ? <button className="light__button" onClick={() => setPage('vacancyCollections')}>Подборки вакансий</button> : null
                        :
                        companyState.vacancies.length ? <button className="light__button" onClick={() => setPage('resumeCollections')}>Подборки резюме</button> : null}
            </div>
            {createPage()}
        </div>
    );
}

export default Account;