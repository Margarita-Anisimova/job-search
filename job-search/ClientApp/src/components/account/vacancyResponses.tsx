
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { useSelector } from "react-redux";
import { CompanyType, ResumeInfoType, VacancyType } from "../types";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { getDate } from "../../exportFunctions";

export default function VacancyResponses() {

    const [responses, setResponses] = useState<ResumeResponse[]>([]);

    const companyState: CompanyType = useSelector((state: any) => state.companyState.companyState)
    const [status, setStatus] = useState(false);
    let resumeId = 0;
    const [response, setResponse] = useState<ResponseToVacancy>({
        vacancy_id: 0,
        resume_id: 0,
        message: '',
        response: '',
        publication_date: new Date(),

    })

    type ResumeResponse = {
        resume: ResumeInfoType;
        response: ResponseToVacancy;
    }

    type ResponseToVacancy = {
        vacancy_id: number;
        resume_id: number;
        message: string;
        response: string;
        publication_date: Date;
    }

    useEffect(() => {
        //  getResponses()
    })

    async function getResponses(vacancy_id: number) {
        const data = await fetch(`responseToVacancy/${vacancy_id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
            })
        setResponses(data);
        setStatus(!status);

    }
    async function sentResponse() {
        document.getElementsByClassName('dialog')[0].close()
        await fetch('responseToVacancy', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(response)
        })
        let arr = responses.slice()
        arr.splice(resumeId, 1);
        setResponses(arr)
    }

    function openDialog(result: string, id: number, resp: ResponseToVacancy) {
        resumeId = id
        setResponse({ ...resp, response: result })
        document.getElementsByClassName('dialog')[0].showModal();
    }

    return (
        <div className='container1'>
            <div style={{ margin: '0' }} className="search__result col-lg-6">
            <p className="resume__collection-title">Вакансии</p>
                {companyState.vacancies.map((res: VacancyType) => {
                    return (
                        
                        <div className="card__container">
                            <div className="card__header">
                                <p className='card__title'>{res.position}</p>
                                <p style={{color: "#333"}} className='card__subtitle'>{res.salary} руб.</p>
                            </div>

                            <div className="card_maininfo">
                                <p className='card__desc'>Требуемый уровень образования: {res.education_level} </p>
                                <p className='card__desc'>Требуемый опыт: {res.work_experience} </p>
                            </div>
                            <div className="card__footer">
                                <button className="light__button light__button-small" onClick={() => status ? setStatus(!status) : getResponses(res.vacancy_id)}>Показать отклики</button>
                                <p className='card__address'>{getDate(res.publication_date)}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="col-lg-6">
                {status ?
                    <div style={{ margin: '0' }} className="search__result">
                        <p className="resume__collection-title">Отклики на вакансию</p>
                        {responses.map((res, id) => {
                            return (
                                <div>
                                    <div className="card__container">

                                        <NavLink className="card__header" target="_blank" rel="noopener noreferrer" tag={Link} to={"/resumecard/" + res.resume.user_id} >
                                            <p className='card__title'>{res.resume.desired_position}</p>
                                            <p className='card__subtitle'>{res.resume.desired_salary} руб.</p>
                                        </NavLink>

                                        <div className="card_maininfo">
                                            <p className='card__desc'>Уровень образования: {res.resume.education_level}</p>
                                            <p className='card__desc'>Стаж работы в сфере: {res.resume.work_experience}</p>
                                        </div>

                                        <div className="card__footer">
                                            <div>
                                                <button className="light__button light__button-small" onClick={() => openDialog('Принято', id, res.response)}>Принять</button>
                                                <button className="light__button light__button-small" onClick={() => openDialog('Отказано', id, res.response)}>Отклонить</button>
                                            </div>
                                            <p className='card__address'>{getDate(res.response.publication_date)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    : null}
            </div>
            <dialog className="dialog">
                <div className="responseForm_header">
                    <p className="response__title">Ответ на отклик</p>
                    <button type="button" onClick={() => document.getElementsByClassName('dialog')[0].close()} className='button closebutton'>
                        X
                    </button>
                </div>
                <div className="response_message">
                    <p>Ваше сообщение:</p>
                    <textarea className='message' value={response.message} onChange={(e) => setResponse({ ...response, message: e.target.value })} placeholder='Введите сообщение для соискателя' maxLength={50}></textarea>
                </div>
                <button style={{marginBottom: "0"}} type="button" onClick={() => sentResponse()} className='button resumecard__btn'>
                    Отправить
                </button>
            </dialog>
        </div >
    );
}