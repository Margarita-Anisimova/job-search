import React from "react";
import { useState, useEffect } from "react";
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Registration.css';
import { useNavigate } from 'react-router-dom'
import { createEmptyAccount } from '../exportFunctions'
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../app/userStateReducer";

function Registration(props: { account: any, setResume: any, setAccount: any; setPageType: any, accountType: string }) {
    const navigate = useNavigate();
    const [formType, setFormType] = useState('authoriz')
    const [formInfo, setformInfo] = useState({ email: '', password: '', f_name: '', l_name: '', phoneNumber: '' })
    const [code, setcode] = useState('');


    //переменные для локального хранилища
    const userState = useSelector((state: any) => state.userState.userState)
    const dispatch = useDispatch();


    function handler(e: any) {
        setformInfo({ ...formInfo, [e.target.name]: e.target.value });
    }

    function set_FormType(type: string) {
        setformInfo({ email: '', password: '', f_name: '', l_name: '', phoneNumber: '' })
        setFormType(type)
    }

    useEffect(() => {
        if (userState.user_type != 'noRegistered') {
            navigate('/')
        }
        document.querySelectorAll('.usererrormessage')[0].style.display = 'none';
        document.querySelectorAll('.emailerrormessage')[0].style.display = 'none';
    })

    function checkrepeated_password(e: any) {
        let input = document.getElementsByName('password')[0];
        if (e.target.value !== input.value) {
            e.target.setCustomValidity('Не соответствует паролю')
        } else {
            e.target.setCustomValidity('')
        }
    }

    function checkForm(e: any) {
        let form = document.querySelectorAll("form")[0]
        !form.checkValidity()
            ? form.reportValidity()
            : formType === 'registr'
                ? confirm()
                : getUser()
    }

    async function getUser() {

        const data = await fetch(`user/${formInfo.email}/${crypto(formInfo.password)}`)
            .then((response) => {
                if (response.ok) {
                    return response.json()

                } else if (response.status === 404) {
                    document.querySelectorAll('.usererrormessage')[0].style.display = 'block'

                }
            })
        if (data) {
            props.setAccount(data)
            dispatch(changeUser({ user_id: data.user_id, user_type: data.user_type, fullemployer: false }))
            document.cookie = await `user=` + encodeURIComponent(data.user_id)
            navigate('/');
        }
        // delete data.password;

    }

    async function confirm() {
        const response = await fetch(`code/${formInfo.email}`);
        const codeFromServer = await response.json();
        if (codeFromServer.error) {
            document.querySelectorAll('.emailerrormessage')[0].style.display = 'block';
        } else {
            setcode(codeFromServer.code);
            setFormType('confirmEmail')
            console.log(codeFromServer.code)
        }

    }

    function crypto(password) {
        var result = "";
        let key = GenerateHexArr(password.length)
        for (let i = 0; i < password.length; ++i) {
            result += (parseInt(key[i], 16) ^ parseInt(password[i], 16)).toString(16) + ' ';
        }
        let a = key.join(' ');
        result += a;
        return result;
    }

    function GenerateHexArr(length) {
        let result = [];
        for (let i = 0; i < length; i++) {
            result.push((Math.floor(Math.random() * 0xFFF)).toString(16))
        }
        return result;
    }

    async function postNewUser() {
        let userType = document.querySelectorAll('input[name="radio"]:checked')[0];
        const response = await fetch('user', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ ...formInfo, password: crypto(formInfo.password), user_type: userType.value })
        })
        const data = await response.json();
        dispatch(changeUser({ user_id: data.user_id, user_type: data.user_type, fullemployer: false }))
        //   props.setAccount({ ...props.account, user_id: data.user_id })
    }

    function chechConfirmCode() {
        let code_input = document.querySelectorAll('.code_input')[0];
        let userType = document.querySelectorAll('input[name="radio"]:checked')[0];
        if (code == code_input.value) {
            props.setAccount({ ...createEmptyAccount(), ...formInfo, user_type: userType.value })
            props.setPageType(userType.value === "applicant" ? 'vacancies' : 'resumes')
            postNewUser();
            dispatch(changeUser({ user_id: 0, user_type: userType.value, fullemployer: false }))
            userType.value === "applicant" ?
                navigate('/resume')
                : navigate('/company');
        } else {
            document.querySelectorAll('.errormessage')[0].style.display = 'block';

        }
    }

    function createRegistForm() {
        if (formType === 'authoriz') {
            return <button className='set_registr' type='button' onClick={() => set_FormType('registr')}>
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

    return (
        <div className='register_page'>
            <form className='register_container'>
                {/* <h3>{formType === 'authoriz' ? 'Вход' : 'Регистрация'}</h3> */}
                <div className='registrForm_title'>
                    <div className="registrForm_title_but">
                        <input onClick={() => set_FormType('authoriz')} required id="radio_title-1" type="radio" name="radio_title" value="authoriz" defaultChecked={formType === 'authoriz' ? true : false} />
                        <label htmlFor="radio_title-1">Вход</label>
                    </div>

                    <div className="registrForm_title_but">
                        <input onClick={() => set_FormType('registr')} required id="radio_title-2" type="radio" name="radio_title" value="registr" checked={formType === 'authoriz' ? false : true} />
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
                <button onClick={(e) => checkForm(e)} type='button' className='submit_button'>{formType === 'authoriz' ? 'Войти' : 'Зарегистрироваться'} </button>

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