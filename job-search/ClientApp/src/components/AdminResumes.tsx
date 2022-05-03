import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getResumeCards } from './cardsTemplate';


export default function AdminResumes() {
    const [resumes, setResumes] = useState([]);
    const navigate = useNavigate();
    const userState = useSelector((state: any) => state.userState.userState)

    useEffect(() => {
        if (userState.user_type != 'admin') {
            navigate('/')
        }
        getResumes()
    })

    async function getResumes() {
        let data = await fetch(`resume/?admin=true&`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
        setResumes(data)
    }

    return (
        <div>
            {getResumeCards(resumes)}
        </div>

    );

}
