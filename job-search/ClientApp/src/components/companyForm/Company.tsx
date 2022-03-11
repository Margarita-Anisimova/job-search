import React from "react";
import { useState } from "react";
import { createTextInputs, createSelectsContainer } from '../account/createFunction';
import './Company.css';
import { AccountType, CompanyType } from '../types';

import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

function Company(props: { account: AccountType, setCompany: any, company: CompanyType }) {


    // const [commonInfo, setCommonInfo] = useState(
    //     {
    //         fullname: '', city: '', description: '', phone: '', email: ''
    //     }
    // );


    function handler(e: any) {
        props.setCompany({ ...props.company, [e.target.name]: e.target.value });
    }

    const commonInfoInputs = [
        { tag: 'fullname', name: 'Название компании', value: props.company.fullname },
        { tag: 'city', name: 'Город', value: props.company.city },
        { tag: 'phone', name: 'Телефон', value: props.company.phone },
        { tag: 'email', name: 'Электронная почта', value: props.company.email },
    ]

    // function save() {
    //     props.setCompany(commonInfo);
    //     console.log(commonInfo);
    //     postNewCompany();
    // }

    async function postNewCompany() {
        let userType = document.querySelectorAll('input[name="radio"]:checked')[0];
        await fetch('company', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ ...commonInfo, user_id: props.account.user_id })
        });
    }

    return (
        <div>
            <h4 className="title">Карточка компании</h4>
            <div className="company_container">
                <form className="company_form">
                    <section>
                        <div className="part">
                            {createTextInputs(commonInfoInputs, handler)}
                            <label>Дополнительное описание</label>
                            <textarea name="description" value={props.company.description} onChange={(e) => handler(e)}></textarea>
                        </div>
                    </section>
                    <NavLink tag={Link} to="/account">Сохранить</NavLink>
                    {/* <NavLink onClick={save} tag={Link} to="/account">Сохранить</NavLink> */}
                </form>
            </div>
        </div>

    );
}

export default Company;
