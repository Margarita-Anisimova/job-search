
import React from "react";
import { useState, useEffect } from "react";
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Registration.css';
import { useNavigate } from 'react-router-dom'

function Registration(props: { setAccountType: any; setPageType: any }) {
    const navigate = useNavigate();
    const [formType, setFormType] = useState('authoriz')
    const [formInfo, setformInfo] = useState({ email: '', password: '', f_name: '', l_name: '', phoneNumber: '' })
    const [code, setcode] = useState('');

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

    useEffect(() => {
        // document.querySelectorAll('.errormessage')[0].style.display = 'none';
        document.querySelectorAll('.usererrormessage')[0].style.display = 'none';
        document.querySelectorAll('.emailerrormessage')[0].style.display = 'none';
    })

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
                        <input value={formInfo.phoneNumber} onChange={(e) => handler(e)} title='Номер телефона должен состоять из 11 цифр' name='phoneNumber' pattern="[0-9]{11}" type="phoneNumber"></input>
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
        } else if (formType === 'registr') {
            confirm()

        } else {
            getUser();

        }
        e.preventDefault();
    }

    async function getUser() {
        const response = await fetch(`user/${formInfo.email}/${formInfo.password}`);
        const data = await response.json();
        if (!data.error) {
            navigate('/');
        } else {
            document.querySelectorAll('.usererrormessage')[0].style.display = 'block';
        }

    }

    async function confirm() {
        const response = await fetch(`code/${formInfo.email}`);
        const codeFromServer = await response.json();
        if (codeFromServer.error) {
            document.querySelectorAll('.emailerrormessage')[0].style.display = 'block';
        } else {
            setcode(codeFromServer.code);
            setFormType('confirmEmail')
        }

    }

    async function postNewUser() {
        let userType = document.querySelectorAll('input[name="radio"]:checked')[0];
        await fetch('user', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ ...formInfo, user_type: userType.value })
        });
    }

    function chechConfirmCode() {
        let code_input = document.querySelectorAll('.code_input')[0];
        let userType = document.querySelectorAll('input[name="radio"]:checked')[0];
        if (code == code_input.value) {
            props.setAccountType(userType.value);
            props.setPageType(userType.value === "applicant" ? 'vacancies' : 'resumes')
            postNewUser();
            navigate('/');
        } else {
            document.querySelectorAll('.errormessage')[0].style.display = 'block';

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
                <p style={{ color: 'red', display: 'none' }} className='confirmLabel usererrormessage'>Не верный email или пароль</p>
                <p style={{ color: 'red', display: 'none' }} className='confirmLabel emailerrormessage'>Пользователь с таким email уже есть</p>
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

                {formType === 'confirmEmail'
                    ? <div className='confirmEmail'>
                        <button onClick={(e) => setFormType('registr')} className='back_button' >Назад</button>
                        <p className='confirmLabel'>Код подтверждения отправлен на почту</p>

                        <input autoFocus className='code_input' placeholder='Введите код'></input>
                        <button type='button' onClick={chechConfirmCode} className='code_confirm_button'>Подтвердить</button>
                        <p style={{ color: 'red', display: 'none' }} className='confirmLabel errormessage'>Неверный код! Попробуйте ещё раз</p>
                    </div>
                    : null}
            </form>
        </div >
    );
}

export default Registration;
