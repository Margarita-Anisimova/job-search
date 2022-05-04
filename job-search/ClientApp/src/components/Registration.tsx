import React from "react";
import { useState, useEffect } from "react";
import './Registration.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { postNewUser, getUserByEmail } from "./baseconnect";
import { changeUser } from "../app/userStateReducer";
import { changeResume } from "../app/resumeStateReducer";
import { changeCompany } from "../app/companyStateReducer";
import { CompanyType, ResumeType } from "./types";

function Registration(props: { setPageType: any, setFormType: any, formType: string }) {
    const navigate = useNavigate();
    // const [formType, setFormType] = useState(props.regitrType)
    const [formInfo, setformInfo] = useState({ email: '', password: '', f_name: '', l_name: '', phone_number: '' })
    const [code, setcode] = useState('');

    const userState = useSelector((state: any) => state.userState.userState)
    const dispatch = useDispatch();
    function handler(e: any) {
        setformInfo({ ...formInfo, [e.target.name]: e.target.value });
    }

    function set_FormType(type: string) {
        setformInfo({ email: '', password: '', f_name: '', l_name: '', phone_number: '' })
        props.setFormType(type)
    }

    useEffect(() => {
        if (userState.user_type != 'noRegistered') {
            navigate('/')
        }
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
        let a = document.querySelectorAll('input[name="radio"]:checked')[0]
        console.log(form.checkValidity())
        !form.checkValidity()
            ? form.reportValidity()
            : props.formType === 'registr'
                ? confirm()
                : authoriz()
    }

    function authoriz() {
        getUserByEmail(formInfo.email, formInfo.password).then((data => {
            document.cookie = `user_id=` + encodeURIComponent(data.user_id)
            document.cookie = 'user_type=' + encodeURIComponent(data.user_type)
            let user = data

            if (data.resume) {
                user = data.user;
                if (data.resume.resumeInfo) {
                    changeData(data.resume)
                    dispatch(changeResume({ resumeState: data.resume }))
                }

            }
            else if (data.company) {
                user = data.user;
                if (data.company.companyInfo) {
                    changeWorkType(data.company)
                    dispatch(changeCompany({ companyState: data.company }))
                }
            } else {
                dispatch(changeUser({ userState: user }))
                navigate('/adminVacancies')
            }
            dispatch(changeUser({ userState: user }))
            navigate('/')
        }))
    }

    function changeWorkType(data: CompanyType) {
        for (let e of data.vacancies) {
            e.work_type = e.work_type.split(',')
        }
    }

    function changeData(resume: ResumeType) {
        if (resume.resumeInfo.profession_id !== 0) {
            resume.resumeInfo.work_type = resume.resumeInfo.work_type.split(',')
            let t = {}
            resume.resumeInfo.skills.split(',').forEach((e: string) => { t[e] = e })
            resume.resumeInfo.skills = t;
        }
    }

    async function confirm() {
        const response = await fetch(`code/${formInfo.email}`);
        const codeFromServer = await response.json();
        if (codeFromServer.error) {
            (document.querySelectorAll('.emailerrormessage')[0] as HTMLElement).style.display = 'block';
        } else {
            setcode(codeFromServer.code);
            props.setFormType('confirmEmail')
            console.log(codeFromServer.code)
        }
    }


    function chechConfirmCode() {
        let code_input = document.querySelectorAll('.code_input')[0];
        let userType = document.querySelectorAll('input[name="radio"]:checked')[0];
        if (code == code_input.value) {
            props.setPageType(userType.value === "applicant" ? 'vacancies' : 'resumes')
            postNewUser(formInfo).then((e) => {
                dispatch(changeUser({ userState: e }))
            });

            userType.value === "applicant" ?
                navigate('/resume')
                : navigate('/company');
        } else {
            (document.querySelectorAll('.errormessage')[0] as HTMLElement).style.display = 'block';

        }
    }

    function createRegistForm() {
        if (props.formType === 'authoriz') {
            return <button className='set_registr' type='button' onClick={() => set_FormType('registr')}>
                Еще нет аккаунта? Зарегистрироваться
            </button>
        }
        else {
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
                    <div className="btn_checktype">
                        <div className="form_radio_btn">
                            <input required id="radio-1" type="radio" name="radio" value="applicant" defaultChecked />
                            <label htmlFor="radio-1">Ищу работу</label>
                        </div>

                        <div className="form_radio_btn">
                            <input required id="radio-2" type="radio" name="radio" value="employer" />
                            <label htmlFor="radio-2">Ищу сотрудников</label>
                        </div>
                    </div>
                </div>
            )
        }

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

    return (
        <div className='register_page'>
            <form className='register_container'>
                {/* <h3>{formType === 'authoriz' ? 'Вход' : 'Регистрация'}</h3> */}
                <div className='registrForm_title'>
                    <div className="registrForm_title_but">
                        <input onClick={() => set_FormType('authoriz')} required id="radio_title-1" type="radio" name="radio_title" value="authoriz" checked={props.formType === 'authoriz' ? true : false} />
                        <label htmlFor="radio_title-1">Вход</label>
                    </div>

                    <div className="registrForm_title_but">
                        <input onClick={() => set_FormType('registr')} required id="radio_title-2" type="radio" name="radio_title" value="registr" checked={props.formType === 'authoriz' ? false : true} />
                        <label htmlFor="radio_title-2">Регистрация</label>
                    </div>
                </div>
                <p style={{ color: 'red', display: 'none' }} className='confirmLabel usererrormessage'>Не верный email или пароль</p>
                <p style={{ color: 'red', display: 'none' }} className='confirmLabel emailerrormessage'>Пользователь с таким email уже есть</p>
                {/* <a href='https://oauth.yandex.ru/authorize?response_type=token&client_id=de71d88895ef4b90992eb38f0e152a25'>Войти через Яндекс</a> */}
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
                <button onClick={(e) => checkForm(e)} type='button' className='submit_button'>{props.formType === 'authoriz' ? 'Войти' : 'Зарегистрироваться'} </button>

                {props.formType === 'confirmEmail'
                    ? <div className='confirmEmail'>
                        <button onClick={(e) => props.setFormType('registr')} className='back_button' >Назад</button>
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