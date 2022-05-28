
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteVacansy } from "../../app/companyStateReducer";
import { deleteVacansyFromBase } from "../baseconnect";
import { crypto } from '../encryption'



export default function RegistrNewEmployer() {
    const navigate = useNavigate();
    const [formInfo, setformInfo] = useState({ email: '', password: '', f_name: '', l_name: '', phone_number: '' })

    const companyState: CompanyType = useSelector((state: any) => state.companyState.companyState)

    function handler(e: any) {
        setformInfo({ ...formInfo, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        (document.querySelectorAll('.usererrormessage')[0] as HTMLElement).style.display = 'none';
        (document.querySelectorAll('.emailerrormessage')[0] as HTMLElement).style.display = 'none';
    })

    function checkrepeated_password(e: any) {
        let input = document.getElementsByName('password')[0];
        if (e.target.value !== (input as HTMLInputElement).value) {
            e.target.setCustomValidity('Не соответствует паролю')
        } else {
            e.target.setCustomValidity('')
        }
    }

    function checkForm(e: any) {
        let form = document.querySelectorAll("form")[0]
        !form.checkValidity()
            ? form.reportValidity()
            : authoriz()
    }

    const [role, setRole] = useState([]);

    async function authoriz() {
        let roleq = role.length === 3 ? 'all' : role.join(',')
        let newUser = { ...formInfo, password: crypto(formInfo.password), user_type: 'employer' }
        const response = await fetch('user/newWorker', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ user: newUser, company_id: companyState.companyInfo.company_id, role: roleq })
        }).then((response) => {
            if (response.status === 200) {
                navigate('/account')
            } else if (response.status === 400) {
                (document.querySelectorAll('.emailerrormessage')[0] as HTMLElement).style.display = 'block';
            }
        })
    }

    function createRegistForm() {
        return (
            <div>
                <label className='label_for_input'>
                    <div>Повторите пароль <span className="red">*</span></div>
                    <button type='button' className="password-control" onClick={(e) => show_hide_password(e, 'password-input1')}></button>
                    <input id="password-input1" onInput={(e) => checkrepeated_password(e)} name='repeated_password' required type="password"></input>
                </label>
                <label className='label_for_input'>
                    <div>Фамилия <span className="red">*</span></div>
                    <input value={formInfo.l_name} onChange={(e) => handler(e)} name='l_name' required type="text"></input>
                </label>
                <label className='label_for_input'>
                    <div>Имя <span className="red">*</span></div>
                    <input value={formInfo.f_name} onChange={(e) => handler(e)} name='f_name' required type="text"></input>
                </label>
                <label className='label_for_input'>
                    Номер телефона
                    <input value={formInfo.phone_number} onChange={(e) => handler(e)} title='Номер телефона должен состоять из 11 цифр' name='phone_number' pattern="[0-9]{11}" type="phoneNumber"></input>
                </label>
            </div>
        )
    }

    function show_hide_password(target, id) {
        var input = document.getElementById(id);
        if (input.getAttribute('type') == 'password') {
            target.target.classList.add('view');
            input.setAttribute('type', 'text');
        } else {
            target.target.classList.remove('view');
            input.setAttribute('type', 'password');
        }
        return false;
    }

    function addTolist(e: any) {
        let a = role.slice()
        if (e.target.id === '0') {
            document.getElementsByName('role').forEach(e => e.id != '0' ? e.checked = false : e.checked = true);
            setRole(['all'])
            return
        } else if (a.indexOf('all') !== -1) {
            document.getElementById('0').checked = false;
            a.splice(a.indexOf('all'), 1)
        }

        if (a.indexOf(e.target.value) !== 0) {
            a.push(e.target.value)
        } else {
            a.splice(a.indexOf(e.target.value), 1)
        }
        setRole(a)
    }

    useEffect(() => {
        if (role.length === 0 && document.getElementById('0').checked) {
            document.getElementsByName('role').forEach(e => e.id != '0' ? e.checked = false : e.checked = true);
            setRole(['all'])
        }
    })

    return (
        <div className='register_page'>
            <form className='register_container registerEmployer_container'>
                <p className="registerForm_header">Зарегистрировать сотрудника</p>
                <div>
                    <p style={{ color: 'red', display: 'none' }} className='confirmLabel usererrormessage'>Не верный email или пароль</p>
                    <p style={{ color: 'red', display: 'none' }} className='confirmLabel emailerrormessage'>Пользователь с таким email уже есть</p>
                    <label className='label_for_input'>
                        <div>Email <span className="red">*</span></div>
                        <input value={formInfo.email} onChange={(e) => handler(e)} name='email' required type="email"></input>
                    </label>
                    <label className='label_for_input'>
                        <div>Пароль <span className="red">*</span></div>
                        <button type='button' className="password-control" onClick={(e) => show_hide_password(e, 'password-input')}></button>
                        <input id="password-input" value={formInfo.password} name='password' onChange={(e) => handler(e)} required type="password"></input>
                    </label>
                    {createRegistForm()}
                </div>
                <div className="user_rights">
                    <label>Права пользователя</label>
                    <div className='chart_block'>
                        <input onChange={(e) => addTolist(e)} value='all' defaultChecked name='role' id="0" type='checkbox'></input><label htmlFor="0">Все права</label>
                        <input onChange={(e) => addTolist(e)} value='add' name='role' id="1" type='checkbox'></input><label htmlFor="1">Добавление вакансий</label> 
                        <input onChange={(e) => addTolist(e)} value='answ' name='role' id="2" type='checkbox'></input><label htmlFor="2">Ответы на отклики</label> 
                        <input onChange={(e) => addTolist(e)} value='resp' name='role' id="3" type='checkbox'></input><label htmlFor="3">Отправка откликов</label> 
                    </div>
                    <button style={{marginTop: '15px'}} onClick={(e) => checkForm(e)} type='button' className='submit_button'>Зарегистрировать сотрудника</button>
                </div>
            </form>
        </div >
    );
}