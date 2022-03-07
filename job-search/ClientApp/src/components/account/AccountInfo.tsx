
import React from "react";
import { useState, useEffect } from "react";
import '../resumeForm/Resume.css';
import { createTextInputs, createSelectsContainer } from './createFunction'
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';


function AccountInfo(props: { account: AccountType, resume: ResumeType }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.account.user_type === 'noRegistered') {
            navigate('/')
        }
    })

    function handler(e: any) {
        props.setAccount({ ...props.account, [e.target.name]: e.target.value });
    }

    function save() {

    }

    const commonInfoInputs = props.account.user_type == 'employer' ?
        [{ tag: 'f_name', name: 'Фамилия', value: props.account.l_name },
        { tag: 'name', name: 'Имя', value: props.account.f_name },]
        :
        [{ tag: 'f_name', name: 'Фамилия', value: props.account.l_name },
        { tag: 'name', name: 'Имя', value: props.account.f_name },
        { tag: 'city', name: 'Город', value: props.resume.city },
        { tag: 'citizenship', name: 'Гражданство', value: props.resume.citizenship },]


    const contacts = [{ tag: 'email', name: 'Email', value: props.account.email },
    { tag: 'phoneNumber', name: 'Номер телефона', value: props.account.phoneNumber },]

    return (
        <div className='resume_container'>
            <form className='resume_form'>

                <section >
                    <h5>Основная информация</h5>

                    <div className='partition-1'>
                        {createTextInputs(commonInfoInputs, handler)}

                        {createSelectsContainer({ name: 'Дата рождения', tag: 'selectContainer burth', selectNames: ['birth_year', 'birth_month', 'birth_day'] }, handler)}

                        {props.account.user_type != 'employer' ? <label>Пол</label> : null}
                        {props.account.user_type != 'employer' ?
                            <div>
                                <div className="gender_radio">
                                    <input className="radio_input" onChange={(e) => handler(e)} required id="gender_radio-1" type="radio" name="gender" value="men" defaultChecked />
                                    <label htmlFor="gender_radio-1">Мужской</label>
                                </div>
                                <div className="gender_radio">
                                    <input className="radio_input" onChange={(e) => handler(e)} required id="gender_radio-2" type="radio" name="gender" value="women" />
                                    <label htmlFor="gender_radio-2">Женский</label>
                                </div>
                            </div>
                            : null}
                    </div>

                    <h5>Контактная информация</h5>
                    <div className='partition_contacts'>
                        {createTextInputs(contacts, handler)}
                    </div>
                </section>
                <NavLink tag={Link} to="/account">Сохранить</NavLink>
            </form>
        </div >
    );
}

export default AccountInfo;