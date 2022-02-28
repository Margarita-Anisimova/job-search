
import React from "react";
import { useState } from "react";
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Registration.css';

function Registration(props: { setAccountType: any; setPageType: any }) {

    const [formType, setFormType] = useState('authoriz')
    const [formInfo, setformInfo] = useState({ info: { email: '', password: '' } })
    // authoriz
    //'registr'

    function handler(e: any) {
        setformInfo({ info: { ...formInfo.info, [e.target.name]: e.target.value } });

    }


    function set_RegistrationForm() {

        setformInfo({ info: { email: '', password: '' } })
        setFormType('registr')
    }

    function createRegistForm() {
        if (formType === 'authoriz') {
            return <button className='set_registr' type='button' onClick={set_RegistrationForm}>
                Еще нет аккаунта? Зарегистрироваться
            </button>
        }
        else {
            return (
                <div>
                    <label className='label_for_input'>
                        Повторите пароль
                        <input required type="password"></input>
                    </label>
                    <div className="form_radio_btn">
                        <input required id="radio-1" type="radio" name="radio" value="applicant" defaultChecked />
                        <label htmlFor="radio-1">Ищу работу</label>
                    </div>

                    <div className="form_radio_btn">
                        <input required id="radio-2" type="radio" name="radio" value="employer" />
                        <label htmlFor="radio-2">Ищу сотрудников</label>
                    </div>
                </div>
            )
        }

    }

    function checkForm(e: any) {
        let form = document.querySelectorAll("form")[0]
        if (!form.checkValidity()) {
            form.reportValidity();
            e.preventDefault();
        } else if (formType === 'registr') {
            let userType = document.querySelectorAll('input[name="radio"]:checked')[0];
            props.setAccountType(userType.value);
            props.setPageType(userType.value === "applicant" ? 'vacancies' : 'resumes')
        }
    }
    return (
        <div className='register_page'>
            <form className='register_container'>
                <h3>{formType === 'authoriz' ? 'Вход' : 'Регистрация'}</h3>
                <label className='label_for_input'>
                    Email
                    <input value={formInfo.info.email} name='email' onChange={(e) => handler(e)} required type="email"></input>
                </label>
                <label className='label_for_input'>
                    Пароль
                    <input value={formInfo.info.password} name='password' onChange={(e) => handler(e)} required type="password"></input>
                </label>
                {createRegistForm()}
                <NavLink onClick={(e) => checkForm(e)} className='submit_button'
                    tag={Link} to="/">{formType === 'authoriz' ? 'Войти' : 'Зарегистрироваться'} </NavLink>
            </form>
        </div >
    );
}

export default Registration;
