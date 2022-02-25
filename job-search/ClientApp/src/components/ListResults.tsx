import * as React from 'react';
import { useState } from 'react';
import './ListResults.css';
import { VacancyType, ResumesType } from './types'

export default function ListResults(props: { results: VacancyType[] | ResumesType[] }) {

    function createList() {
        if (props.results[0].type === 'resume') {
            return props.results.map((result) => {
                return (
                    <div className="card_container">
                        <p>{result.name}</p>
                        <p>Опыт {result.experience}</p>
                        <p>{result.profession}</p>
                        <p>{result.city}</p>
                    </div>
                )
            })

        } else {
            return props.results.map((result) => {
                return (

                    <div className="card_container">
                        <p>{result.name}</p>
                        <p>{result.salary}</p>
                        <p>{result.description}</p>
                        <p>{result.adress}</p>
                    </div>
                )
            })
        }

    }

    return (
        <div >
            {createList()}
        </div >
    );
}

