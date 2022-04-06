import React from "react";
import { useState } from "react";
import { createTextInputs, createSelectsContainer } from '../account/createFunction';
import './Company.css';
import { AccountType, CompanyType } from '../types';

import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function Company(props: { account: AccountType, setCompany: any, company: CompanyType }) {


    const userState = useSelector((state: any) => state.userState.userState)
    function handler(e: any) {
        props.setCompany({ ...props.company, companyInfo: { ...props.company.companyInfo, [e.target.name]: e.target.value } });
    }

    const commonInfoInputs = [
        { tag: 'fullname', name: 'Название компании', value: props.company.companyInfo.fullname, required: true },
        { tag: 'city', name: 'Город', value: props.company.companyInfo.city, required: true },
        { tag: 'contact_face', name: 'Контактное лицо', value: props.company.companyInfo.contact_face, required: false },
    ]

    function save(e) {
        // props.setCompany(commonInfo);
        // console.log(commonInfo);
        let form = document.querySelectorAll("form")[0]
        let a = form.checkValidity()
        if (!a) {
            form.reportValidity()
            e.preventDefault()
        } else {
            if (props.company.companyInfo.company_id === 0) {
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
            body: JSON.stringify(props.company.companyInfo)
        })
    }

    async function postNewCompany() {
        let a = { ...props.company.companyInfo, user_id: userState.user_id }
        const response = await fetch('company', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(a)
        })
        const data = await response.json();
        await props.setCompany({ ...props.company, companyInfo: { ...props.company.companyInfo, company_id: data } })
    }

    return (
        <div>
            <h4 className="title">Карточка компании</h4>
            <div className="company_container">
                <form className="company_form">
                    <section>
                        <div className="part">
                            {createTextInputs(commonInfoInputs, handler)}
                            <label><div>Электронная почта<span className="red">*</span></div></label>
                            <input value={props.company.companyInfo.email} onChange={handler} required type="email" name='email'></input>
                            <label>Телефон</label>
                            <input value={props.company.companyInfo.phone} onChange={handler} title='Номер телефона должен состоять из 11 цифр' pattern="[0-9]{11}" type="phoneNumber" name='phone'></input>

                            <label>Дополнительное описание</label>
                            <textarea name="description" value={props.company.companyInfo.description} onChange={(e) => handler(e)} maxLength="200"></textarea>
                        </div>
                    </section>
                    <div className="button-form">
                        <NavLink onClick={e => save(e)} tag={Link} to="/account">Сохранить</NavLink>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Company;
