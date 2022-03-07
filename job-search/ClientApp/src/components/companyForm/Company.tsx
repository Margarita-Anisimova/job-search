import React from "react";
import { useState } from "react";
import { createTextInputs, createSelectsContainer } from '../account/createFunction';
import './Company.css';

function Company() {

    const [commonInfo, setCommonInfo] = useState(
        {
            fullname: '', city: '', description: '', phone: '', email: ''
        }
    );


    function handler(e: any) {
        setCommonInfo({ ...commonInfo, [e.target.name]: e.target.value });
    }

    const commonInfoInputs = [
        { tag: 'fullname', name: 'Название компании', value: commonInfo.fullname },
        { tag: 'city', name: 'Город', value: commonInfo.city },
        { tag: 'phone', name: 'Телефон', value: commonInfo.phone },
        { tag: 'email', name: 'Электронная почта', value: commonInfo.email },
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
                            <textarea name="description" value={commonInfo.description} onChange={(e) => handler(e)}></textarea>
                        </div>
                    </section>

                </form>

            </div>
        </div>

    );
}

export default Company;
