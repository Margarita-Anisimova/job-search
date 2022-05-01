import React from "react";
import { useState } from "react";
import { createTextInputs, createSelectsContainer } from '../account/createFunction';
import './Company.css';
import { AccountType, CompanyType } from '../types';

import { NavItem, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { changeCompanyInfo } from "../../app/companyStateReducer";

function Company() {
    const userState: AccountType = useSelector((state: any) => state.userState.userState)
    const companyState: CompanyType = useSelector((state: any) => state.companyState.companyState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handler(e: any) {
        dispatch(changeCompanyInfo({ name: e.target.name, value: e.target.value }))
    }

    const commonInfoInputs = [
        { tag: 'fullname', name: 'Название компании', value: companyState.companyInfo.fullname, required: true },
        { tag: 'tin', name: 'ИНН', value: companyState.companyInfo.tin, required: true },
        { tag: 'city', name: 'Город', value: companyState.companyInfo.city, required: true },
        { tag: 'contact_face', name: 'Контактное лицо', value: companyState.companyInfo.contact_face, required: false },
    ]

    function save(e: any) {
        let form = document.querySelectorAll("form")[0]
        let a = form.checkValidity()
        if (!a) {
            form.reportValidity()
            e.preventDefault()
        } else {
            if (companyState.companyInfo.company_id === 0) {
                postNewCompany();
            } else {
                putCompany();
            }
        }
    }

    async function putCompany() {
        const response = await fetch('company', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(companyState.companyInfo)
        }).then((response) => {
            if (response.status === 200) {
                const data = response.json();
                navigate('/account')
            }
            else if (response.status === 400) {
                (document.querySelectorAll('.errormessage')[0] as HTMLElement).style.display = 'block';
            }

        })
    }

    async function postNewCompany() {
        dispatch(changeCompanyInfo({ name: 'user_id', value: userState.user_id }))
        await fetch('company', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(companyState.companyInfo)
        }).then((response) => {
            if (response.status === 200) {
                const data = response.json();
                dispatch(changeCompanyInfo({ name: 'company_id', value: data }))
                navigate('/account')
            }
            else if (response.status === 400) {
                (document.querySelectorAll('.errormessage')[0] as HTMLElement).style.display = 'block';
            }

        })
    }

    return (
        <div>
            <h4 className="title">Карточка компании</h4>
            <div className="company_container">
                <form className="company_form">
                    <section>
                        <p style={{ color: 'red', display: 'none' }} className='errormessage'>ИНН не вылидный, проверьте введенные данные</p>
                        <div className="part">
                            {createTextInputs(commonInfoInputs, handler)}
                            <label><div>Электронная почта<span className="red">*</span></div></label>
                            <input value={companyState.companyInfo.email} onChange={handler} required type="email" name='email'></input>
                            <label>Телефон</label>
                            <input value={companyState.companyInfo.phone} onChange={handler} title='Номер телефона должен состоять из 11 цифр' pattern="[0-9]{11}" type="phoneNumber" name='phone'></input>

                            <label>Дополнительное описание</label>
                            <textarea name="description" value={companyState.companyInfo.description} onChange={(e) => handler(e)} maxLength={200}></textarea>
                        </div>
                    </section>
                    <div className="button-form">
                        {/* <NavLink onClick={e => save(e)} tag={Link} to="/account">Сохранить</NavLink> */}
                        <button type='button' onClick={e => save(e)} >Сохранить</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Company;
