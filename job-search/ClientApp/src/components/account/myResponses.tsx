
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'

export default function myResponses() {

    const [myResponses, setMyResponses] = useState([{
        vacancy: {
            company: 'Компания',
            name: 'Название',

        },
        result: true,
        message: 'Будем рады принять вас в свой коллектив'
    },
    {
        vacancy: {
            company: 'Компания',
            name: 'Название',

        },
        result: false,
        message: ''
    }])

    return (
        <div className='myResponses_container'>
            {myResponses.map((e) => {
                return <div className="responseCard">
                    <div>
                        <p>{e.vacancy.company}</p>
                        <p>{e.vacancy.name}</p>
                        <div className="result">{e.result ? 'Одобрено' : 'Отказано'}</div>
                    </div>

                    <div className="response_message">
                        {e.message}
                    </div>
                </div>
            })}
        </div>
    );
}