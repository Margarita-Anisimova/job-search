
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'

export default function Profile(props: { accountType: string }) {

    const [info, setInfo] = useState({
        name: 'Эдвард Элрик',
        age: 15,
        city: 'Аместрис',
        phoneNumber: '+712345678910',
        email: 'fullmetalAlchemist@ed.ru'
    })


    const [resume, setResumes] = useState({
        name: 'Алхимик',
        salary: 'договорная з/п',
        updated: '03.03.2022',
    })


    return (
        <div className='pofile_container'>
            <div className="mainInfo">
                <img src={img} className='avatar'></img>
                <div className="userDescription">
                    <p>{info.name}</p>
                    <p>{info.age + ' лет'}</p>
                    <p>{info.city}</p>
                    <p>{info.phoneNumber}</p>
                    <p>{info.email}</p>
                </div>
                <button className="editProfile">Редактировать профиль</button>
            </div>
            <div className="user_resumes_container">
                <p><b>Резюме</b></p>
                <div className="resumeCard">
                    <p style={{ color: 'orange', fontSize: '20px' }}>{resume.name}</p>
                    <p>{resume.salary}</p>
                    <p>{resume.updated}</p>

                    <div className="resumeButtons">
                        <button className="resumeButton">Редактировать</button>
                        <button className="resumeButton">Удалить</button>
                    </div>
                </div>

            </div>

        </div>
    );
}