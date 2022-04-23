import * as React from 'react';
import './NavMenu.css';
import '../custom.css';
import { useState } from 'react';
import { CompanyType, ResumeType } from './types';
import { useSelector } from 'react-redux';

export default function ResumeResponseDialog(props: { resume: ResumeType, setButton: any }) {

    const companyState: CompanyType = useSelector((state: any) => state.companyState.companyState)
    const [message, setMessage] = useState("");
    const [vacancy_id, setVacancy_id] = useState(companyState.vacancies[0].vacancy_id.toString());



    async function sentResponse() {
        props.setButton('sented')
        let r = document.getElementsByClassName('dialog')[0].close();
        let res = {
            vacancy_id: parseInt(vacancy_id),
            resume_id: props.resume.resumeInfo.resume_id,
            message: message,
        }
        const response = await fetch('responseToResume', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(res)
        })
    }

    return (
        <dialog className="dialog">
            <button onClick={() => document.getElementsByClassName('dialog')[0].close()} className='button resumecard__btn'>
                X
            </button>
            <p>Отклик на резюме</p>
            <select onChange={(e) => setVacancy_id(e.target.id)}>
                {companyState.vacancies.map((e) => {
                    return <option id={e.vacancy_id.toString()}>{e.position}</option>
                })}
            </select>
            <p>Сопроводительное письмо</p>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} minLength={30} placeholder='Введите сообщение для соискателя'></textarea>
            <button onClick={() => sentResponse()} className='button resumecard__btn'>
                Отправить отклик
            </button>
        </dialog>
    );

}
