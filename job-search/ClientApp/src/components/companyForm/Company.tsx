import React from "react";
import { useState } from "react";
import { createTextInputs, createSelectsContainer } from '../resumeForm/createFunction';
import './Company.css';
import { useNavigate } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


function Company() {
    const navigate = useNavigate();


    const [commonInfo, setCommonInfo] = useState(
        {
            fullname: '', city: '', description: '', contact_face: '', phone: '', email: ''
        }
    );


    function handler(e: any) {
        setCommonInfo({ ...commonInfo, [e.target.name]: e.target.value });
    }

    const commonInfoInputs = [
        { tag: 'fullname', name: 'Название компании', value: commonInfo.fullname },
        { tag: 'city', name: 'Город', value: commonInfo.city },
        { tag: 'contact_face', name: 'Контактное лицо', value: commonInfo.contact_face },
        { tag: 'phone', name: 'Телефон', value: commonInfo.phone },
        { tag: 'email', name: 'Электронная почта', value: commonInfo.email },
    ]

    async function postNewCompany() {
        await fetch('company', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ ...commonInfo})
        });
        navigate('/');
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
                        <textarea name="description" value = {commonInfo.description} onChange={(e) => handler(e) }></textarea>
                        </div>
                    </section>
                    <button ></button>
                    <button type='button' onClick={postNewCompany} className='button'>Сохранить</button>
                </form>

            </div>
        </div>

    );
}

export default Company;
