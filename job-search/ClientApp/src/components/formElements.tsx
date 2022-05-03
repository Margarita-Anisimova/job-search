import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "reactstrap";


export function getEducationLevel(value, onChange) {
    return (
        <select onChange={(e) => onChange(e)} value={value} className="edu_level" name='education_level'>
            <option>Нет образования</option>
            <option>Основное общее</option>
            <option>Среднее общее</option>
            <option>Среднее профессиональное</option>
            <option>Высшее образование</option>
        </select>
    )
}

export function getWorkExperience(onChange) {
    return (
        <div>
            <div className="workexp_radio">
                <input className="radio_input" onChange={(e) => onChange(e)} id="workexp_radio-1" type="radio" name="work_experience" value="0" defaultChecked />
                <label htmlFor="workexp_radio-1">без опыта</label>
            </div>
            <div className="workexp_radio">
                <input className="radio_input" onChange={(e) => onChange(e)} id="workexp_radio-2" type="radio" name="work_experience" value="1-3" />
                <label htmlFor="workexp_radio-2">1-3 года</label>
            </div>
            <div className="workexp_radio">
                <input className="radio_input" onChange={(e) => onChange(e)} id="workexp_radio-3" type="radio" name="work_experience" value="3-5" />
                <label htmlFor="workexp_radio-3">3-5 лет</label>
            </div>
            <div className="workexp_radio">
                <input className="radio_input" onChange={(e) => onChange(e)} id="workexp_radio-4" type="radio" name="work_experience" value="5-50" />
                <label htmlFor="workexp_radio-4">более 5 лет</label>
            </div>
        </div>
    )
}

function addTolist(e: any, obj) {
    obj.work_type[e.target.id] = !obj.work_type[e.target.id];
}

export function getWorkType(obj) {
    return (
        <div className='chart_block'>
            <label> <input onChange={(e) => addTolist(e, obj)} name='work_type' id="0" type='checkbox'></input>Полный рабочий день</label>
            <label> <input onChange={(e) => addTolist(e, obj)} name='work_type' id="1" type='checkbox'></input>Гибкий</label>
            <label> <input onChange={(e) => addTolist(e, obj)} name='work_type' id="2" type='checkbox'></input>Удаленная работа</label>
            <label> <input onChange={(e) => addTolist(e, obj)} name='work_type' id="3" type='checkbox'></input>Сменный</label>
            <label> <input onChange={(e) => addTolist(e, obj)} name='work_type' id="4" type='checkbox'></input>Вахтовая</label>
        </div>
    )
}
