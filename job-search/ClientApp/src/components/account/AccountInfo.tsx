
import React from "react";
import { useState, useEffect } from "react";
import '../resumeForm/Resume.css';
import { createTextInputs, createSelectsContainer } from './createFunction'
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { useSelector } from "react-redux";

function AccountInfo(props: { setResume: any, setAccount: any, account: AccountType, resume: ResumeType }) {
    const navigate = useNavigate();

    const userState = useSelector((state: any) => state.userState.userState)
    useEffect(() => {
        // if (props.account.user_type === 'noRegistered') {
        //     navigate('/')
        // }
    })

    // async function getUser() {

    //     const data = await fetch(`user/${props.account.email}/${props.account.password}`)
    //         .then((response) => {
    //             if (response.ok) {
    //                 return response.json()

    //             } else if (response.status === 404) {
    //                 document.querySelectorAll('.usererrormessage')[0].style.display = 'block'
    //             }
    //         })
    //     // delete data.password;
    //     props.setAccount(data)
    //     dispatch(changeUser({ user_id: data.user_id, user_type: data.user_type }))
    //     navigate('/');
    // }

    function handler(e: any) {
        if (typeof props.account[e.target.name] !== 'undefined')
            props.setAccount({ ...props.account, [e.target.name]: e.target.value });
        else {
            props.setResume({ ...props.resume, [e.target.name]: e.target.value });
        }
    }

    const commonInfoInputs =
        [{ tag: 'l_name', name: 'Фамилия', value: props.account.l_name, required: true },
        { tag: 'f_name', name: 'Имя', value: props.account.f_name, required: true },]


    const contacts = [{ tag: 'email', name: 'Email', value: props.account.email, required: true },
    { tag: 'phone_number', name: 'Номер телефона', value: props.account.phone_number },]


    async function putChange() {
        //проверки
        const response = await fetch('user', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'text/json; charset=UTF-8' },
            body: JSON.stringify({ ...props.account, user_id: userState.user_id, })
        })
    }

    return (
        <div className='resume_container'>
            <form className='resume_form'>

                <section >
                    <h5>Основная информация</h5>

                    <div className='partition-mainInfo'>
                        {createTextInputs(commonInfoInputs, handler)}
                    </div>
                    <h5>Контактная информация</h5>
                    <div className='partition-mainInfo'>
                        {createTextInputs(contacts, handler)}
                    </div>
                </section>
                <NavLink onClick={putChange} tag={Link} to="/account">Сохранить</NavLink>
            </form>
        </div >
    );
}

export default AccountInfo;