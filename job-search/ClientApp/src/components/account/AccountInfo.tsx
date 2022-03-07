
import React from "react";
import { useState, useEffect } from "react";
import '../resumeForm/Resume.css';
import { createTextInputs, createSelectsContainer } from './createFunction'
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';


function AccountInfo(props: { setResume: any, setAccount: any, account: AccountType, resume: ResumeType }) {
    const navigate = useNavigate();
    const [birth_date, setbirth_date] = props.account.user_type === 'applicant' ? useState(props.resume.birth_date.split(':')) : useState([''])

    useEffect(() => {
        // if (props.account.user_type === 'noRegistered') {
        //     navigate('/')
        // }
    })

    function handler(e: any) {
        if (typeof props.account[e.target.name] !== 'undefined')
            props.setAccount({ ...props.account, [e.target.name]: e.target.value });
        else {
            props.setResume({ ...props.resume, [e.target.name]: e.target.value });
        }
    }

    function handlerData(e: any) {
        let r = birth_date.slice();
        switch (e.target.name) {
            case 'birth_day':
                r[0] = e.target.value;
                break
            case 'birth_year':
                r[2] = e.target.value;
                break
            case 'birth_month':
                r[1] = e.target.value;
        }
        setbirth_date(r);
    }

    function save() {
        if (props.account.user_type === 'applicant')
            props.setResume({ ...props.resume, birth_date: birth_date.join(':') })
    }

    const commonInfoInputs = props.account.user_type == 'employer' ?
        [{ tag: 'l_name', name: 'Фамилия', value: props.account.l_name },
        { tag: 'f_name', name: 'Имя', value: props.account.f_name },]
        :
        [{ tag: 'l_name', name: 'Фамилия', value: props.account.l_name },
        { tag: 'f_name', name: 'Имя', value: props.account.f_name },
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

                        {props.account.user_type != 'employer' ? createSelectsContainer({
                            name: 'Дата рождения',
                            tag: 'selectContainer burth',
                            selectNames: [{ name: 'birth_year', value: birth_date[2] },
                            { name: 'birth_month', value: birth_date[1] },
                            { name: 'birth_day', value: birth_date[0] }]
                        }, handlerData) : null}

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
                <NavLink onClick={save} tag={Link} to="/account">Сохранить</NavLink>
            </form>
        </div >
    );
}

export default AccountInfo;