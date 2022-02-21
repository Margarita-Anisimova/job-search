
import React from "react";
import { useState } from "react";
import VacancyResponses from './VacancyResponses';
import ResumeResponses from './ResumeResponses';
// import { useNavigate } from 'react-router-dom'

function Account(props: { accountType: string }) {
    // const navigate = useNavigate();

    function start() {
        if (props.accountType === 'noRegistered') {
            // navigate('/')
        }
    }

    const [state, setState] = useState({ state: 'mainPage' })

    function createContent() {
        if (state.state === 'mainPage') {
            return (
                <div style={{ width: '500px', height: '500px', border: '1px solid black' }}>
                    Общая информация о {props.accountType === 'user' ? 'пользователе' : 'работадателе'}
                </div>)
        } else {
            return createResponsesList()
        }

    }

    function createResponsesList() {
        return props.accountType === 'applicant' ? <VacancyResponses></VacancyResponses> : <ResumeResponses></ResumeResponses>

    }

    return (
        <div>
            {start()}
            Страница аккаунта
            <button onClick={() => setState({ state: 'resume' })}>
                {props.accountType === 'user' ? 'Отклики' : 'Вакансии'}
            </button>
            <button onClick={() => setState({ state: 'mainPage' })}>
                Мои данные
            </button>
            {createContent()}

        </div>
    );
}

export default Account;