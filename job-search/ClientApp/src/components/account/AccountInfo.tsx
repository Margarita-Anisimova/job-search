
import React from "react";
import { useState, useEffect } from "react";
import '../resumeForm/Resume.css';
import { createTextInputs, createSelectsContainer } from './createFunction'
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { useDispatch, useSelector } from "react-redux";
import { changeUserProperty } from "../../app/userStateReducer";
import { changeResumeProperty } from "../../app/resumeStateReducer";

function AccountInfo() {
    const navigate = useNavigate();
    const userState: AccountType = useSelector((state: any) => state.userState.userState)
    const dispatch = useDispatch();

    useEffect(() => {
        // if (userState.user_type === 'noRegistered') {
        //     navigate('/')
        // }
    })


    function handler(e: any) {
        // if (userState[e.target.name])
        dispatch(changeUserProperty({ propertyName: e.target.name, property: e.target.value }))
        // else {
        //     dispatch(changeResumeProperty({ propertyName: e.target.name, property: e.target.value }))
        // }
    }

    const commonInfoInputs =
        [{ tag: 'l_name', name: 'Фамилия', value: userState.l_name, required: true },
        { tag: 'f_name', name: 'Имя', value: userState.f_name, required: true },]


    const contacts = [{ tag: 'email', name: 'Email', value: userState.email, required: true },
    { tag: 'phone_number', name: 'Номер телефона', value: userState.phone_number, required: false },]


    async function putChange() {
        //проверки
        const response = await fetch('user', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'text/json; charset=UTF-8' },
            body: JSON.stringify(userState)
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
                <div className="button-form">
                    <NavLink onClick={putChange} tag={Link} to="/account">Сохранить</NavLink>
                </div>
            </form>
        </div >
    );
}

export default AccountInfo;