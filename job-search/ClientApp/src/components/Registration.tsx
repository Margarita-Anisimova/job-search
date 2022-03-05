
import React from "react";
import { useState, useEffect } from "react";
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Registration.css';

function Registration(props: { setAccountType: any; setPageType: any }) {

    const [formType, setFormType] = useState('authoriz')
    const [formInfo, setformInfo] = useState({ email: '', password: '', f_name: '', l_name: '', phoneNumber: '' })
    let userType = '';

    function handler(e: any) {
        setformInfo({ ...formInfo, [e.target.name]: e.target.value });

    }

    function set_RegistrationForm() {
        setformInfo({ email: '', password: '', f_name: '', l_name: '', phoneNumber: '' })
        setFormType('registr')
    }
    function set_AuthorizForm() {
        setformInfo({ email: '', password: '', f_name: '', l_name: '', phoneNumber: '' })
        setFormType('authoriz')
    }

    function checkrepeated_password(e) {
        let input = document.getElementsByName('password')[0];
        if (e.target.value !== input.value) {
            e.target.setCustomValidity('Не соответствует паролю')
        } else {
            e.target.setCustomValidity('')
        }
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
                        <input onInput={(e) => checkrepeated_password(e)} name='repeated_password' required type="password"></input>
                    </label>
                    <label className='label_for_input'>
                        Фамилия
                        <input value={formInfo.l_name} onChange={(e) => handler(e)} name='l_name' required type="text"></input>
                    </label>
                    <label className='label_for_input'>
                        Имя
                        <input value={formInfo.f_name} onChange={(e) => handler(e)} name='f_name' required type="text"></input>
                    </label>
                    <label className='label_for_input'>
                        Номер телефона
                        <input value={formInfo.phoneNumber} onChange={(e) => handler(e)} title='Номер телефона должен состоять из 11 цифр' required name='phoneNumber' pattern="[0-9]{11}" type="phoneNumber"></input>
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
                {/* <h3>{formType === 'authoriz' ? 'Вход' : 'Регистрация'}</h3> */}
                <div className='registrForm_title'>
                    <div className="registrForm_title_but">
                        <input onClick={set_AuthorizForm} required id="radio_title-1" type="radio" name="radio_title" value="authoriz" defaultChecked={formType === 'authoriz' ? true : false} />
                        <label htmlFor="radio_title-1">Вход</label>
                    </div>

                    <div className="registrForm_title_but">
                        <input onClick={set_RegistrationForm} required id="radio_title-2" type="radio" name="radio_title" value="registr" checked={formType === 'authoriz' ? false : true} />
                        <label htmlFor="radio_title-2">Регистрация</label>
                    </div>
                </div>

                <label className='label_for_input'>
                    Email
                    <input value={formInfo.email} onChange={(e) => handler(e)} name='email' required type="email"></input>
                </label>
                <label className='label_for_input'>
                    Пароль
                    <input value={formInfo.password} name='password' onChange={(e) => handler(e)} required type="password"></input>
                </label>
                {createRegistForm()}
                <NavLink onClick={(e) => checkForm(e)} className='submit_button'
                    tag={Link} to="/">{formType === 'authoriz' ? 'Войти' : 'Зарегистрироваться'} </NavLink>

            </form>
        </div >
    );
}

export default Registration;
