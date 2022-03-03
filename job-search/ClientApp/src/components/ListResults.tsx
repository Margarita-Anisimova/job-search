import * as React from 'react';
import { useState } from 'react';
import './ListResults.css';
import '../custom.css';
import { VacancyType, ResumesType } from './types'

export default function ListResults(props: { results: VacancyType[] | ResumesType[] }) {

    function createList() {
        if (props.results.length) {
            if (props.results[0].type === 'resume') {
                return props.results.map((result) => {
                    return (
                        <div className="card__container">
                            <p className='card__title'>{result.name}</p>
                            <p className='card__subtitle'>Опыт {result.experience}</p>
                            <p className='card__desc'>{result.profession}</p>
                            <p className='card__address'>{result.city}</p>
                            <button className='button card__btn'>Откликнуться</button>
                        </div>
                    )
                })

            } else {
                return props.results.map((result) => {
                    return (

                        <div className="card__container">
                            <p className='card__title'>{result.name}</p>
                            <p className='card__subtitle'>{result.salary}</p>
                            <p className='card__desc'>{result.description}</p>
                            <p className='card__address'>{result.adress}</p>
                            <button className='button card__btn'>Откликнуться</button>
                        </div>
                    )
                })
            }
        }


    }

    return (
        <div >
            {createList()}
        </div >
    );
}

