import React from "react";
import { useState } from "react";
import './Vacancy.css';
import { createTextInputs, createSelect } from '../account/createFunction';
// import '../../custom.css';


export default function About_Work() {
    let [about_workInfo, setabout_workInfo] = useState(
        {
            salary: '', requirements: '', responsibilities: '',
        }
    );

    function posthandler(e: any) {
        setabout_workInfo({ ...about_workInfo, [e.target.name]: e.target.value });
    }

    const postInfoInputs = [
        { tag: 'salary', name: 'Зарплата', value: about_workInfo.salary }];




    return (
        <section>
            <h5>О работе</h5>
            <div className='part part-2'>
                {createTextInputs(postInfoInputs, posthandler)}

                <label>График работы</label>
                <div className='chart_block'>

                    <label htmlFor="chart1">
                        <input className="checkbox_input" id="chart1" type='checkbox'></input>
                        Полный рабочий день
                    </label>
                    <label htmlFor="chart2"> <input name='work_chart' id="chart2" type='checkbox'></input>Гибкий</label>

                    <label htmlFor="chart3"> <input name='work_chart' id="chart3" type='checkbox'></input>Удаленная работа</label>

                    <label htmlFor="chart4"> <input name='work_chart' id="chart4" type='checkbox'></input>Сменный</label>
                </div>

                <label>Тип занятости</label>
                <div className='busyness_block'>
                    <label >
                        <input type='checkbox'></input>
                        Полная
                    </label>
                    <label >
                        <input type='checkbox'></input>
                        Вахтовая
                    </label>
                    <label >
                        <input type='checkbox'></input>
                        Стажировка
                    </label>
                    <label >
                        <input type='checkbox'></input>
                        Временная работа
                    </label>
                </div>


                <label>Обязанности</label>
                <textarea name="responsibilities" value={about_workInfo.responsibilities} onChange={(e) => posthandler(e)}></textarea>

                <label>Требования</label>
                <textarea name="requirements" value={about_workInfo.requirements} onChange={(e) => posthandler(e)}></textarea>





            </div>
        </section>
    )
}