
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './pgfFnQm.jpg'

export default function ResumeResponses() {

    let resumeResponses = [1]
    return (
        <div className='pofile_container'>

            {resumeResponses.map((e) => {
                return <div className="responseCard">
                    <p>Название компании</p>
                    <p>Текст</p>

                    <div className="resumeButtons">
                        <button className="resumeButton">Удалить</button>
                    </div>
                </div>
            })}
        </div>
    );
}