import React from "react";
import { useState } from "react";
import { createTextInputs, createSelectsContainer } from '../account/createFunction';
import './Company.css';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { CompanyType } from '../types';

function Company(props: { company: CompanyType, setCompany: any }) {

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
                </form>
            </div>
        </div>

    );
}

export default Company;
