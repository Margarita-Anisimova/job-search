import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getVacancyCards } from './cardsTemplate';
import './AdminVR.css';


export default function AdminVacancies() {
    const [vacancies, setVacancies] = useState([]);
    const navigate = useNavigate();
    const userState = useSelector((state: any) => state.userState.userState)

    useEffect(() => {
        if (userState.user_type != 'admin') {
            navigate('/')
        }
        getResumes()
    })

    async function getResumes() {
        let data = await fetch(`vacancy/?admin=true&`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
        setVacancies(data)
    }


    return (
        <div className='container admin_section'>
            <div className="admin_vacancies">
                {getVacancyCards(vacancies)}
            </div>
        </div>

    );

}
