import * as React from 'react';
import './NavMenu.css';
import '../custom.css';
import { useEffect, useState } from 'react';
import { CompanyType, ResumeType } from './types';
import { useSelector } from 'react-redux';

export default function ResumeResponseDialog(props: { resume: ResumeType, setButton: any }) {

    const companyState: CompanyType = useSelector((state: any) => state.companyState.companyState)
    const [message, setMessage] = useState("");
    const [vacancy_id, setVacancy_id] = useState(companyState.vacancies[0] ? companyState.vacancies[0].vacancy_id.toString() : '0');
    const [vacancyResponse, setvacancyResponse] = useState(false);


    useEffect(() => {
        if (vacancy_id !== '0')
            changeVacancy(vacancy_id)
    })

    async function sentResponse() {
        let form = document.querySelectorAll("form")[0]
        let textarea = document.querySelectorAll("textarea")[0]
        let error = document.querySelectorAll(".errormessage")[0]
        if (!form.checkValidity()) {
            form.reportValidity()
            return
        }
        if (textarea.value.length < 30) {
            (error as HTMLElement).style.display = "block"
            return
        }
        if (vacancyResponse) {
            return
        }
        else {
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
    }

    async function changeVacancy(vacancy_id: string) {
        setVacancy_id(vacancy_id)
        const response = await fetch(`responseToresume/${parseInt(vacancy_id)}/${props.resume.resumeInfo.resume_id}`)
        let data = await response.json()
        setvacancyResponse(data)
    }

    return (
        <dialog className="dialog">
            <form className='responseForm'>
                <div className="responseForm_header">
                    <p>Отклик на резюме</p>
                    <button className='button closebutton' type="button" onClick={() => document.getElementsByClassName('dialog')[0].close()}>
                    X
                    </button>
                </div>
                
                
                {vacancyResponse ? <p style={{ color: 'red' }}>На эту вакансию уже отправлен отклик</p> : null}
                <div className="response_choiceVacancy">
                <p>По вакансии</p>
                    <select className='select_vacancy' required onChange={(e) => changeVacancy(e.target[e.target.selectedIndex].id)}>
                        {companyState.vacancies.map((e) => {
                            return <option id={e.vacancy_id.toString()}>{e.position}</option>
                        })}
                    </select>
                </div>
                
                
                <div className="response_message">
                    <p>Сопроводительное письмо</p>
                    <p style={{ color: 'red', display: 'none' }} className='errormessage'>Должно быть не менее 30 символов</p>
                    <textarea className='message' title='Должно быть не менее 30 символов' required value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Введите сообщение для соискателя'></textarea>
                </div>
                
                <button type="button" onClick={() => sentResponse()} className='button'>
                    Отправить отклик
                </button>
            </form>
        </dialog>
    );

}
