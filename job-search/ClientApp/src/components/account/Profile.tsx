
import React from "react";
import { useState, useEffect } from "react";
import "./Account.css"
import img from './noavatar.svg'
import { useNavigate } from 'react-router-dom'
import { AccountType, ResumeType, CompanyType, VacancyType } from '../types';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import CompanyProfile from "./CompanyProfile";
import { useDispatch, useSelector } from "react-redux";

import { createEmptyCompany, createEmptyResume, createEmptyAccount } from '../../exportFunctions'
import { deleteResume } from "../baseconnect";
import { changeResume } from "../../app/resumeStateReducer";

export default function Profile() {

    const navigate = useNavigate();
    const userState: AccountType = useSelector((state: any) => state.userState.userState)
    const resumeState: ResumeType = useSelector((state: any) => state.resumeState.resumeState)

    const dispatch = useDispatch();

    function getAge() {
        return (new Date()).getFullYear() - parseInt(resumeState.resumeInfo.birth_date.split(':')[2])
    }

    function delResume() {
        deleteResume(resumeState.resumeInfo.resume_id)
        dispatch(changeResume({ resumeState: createEmptyResume() }))
    }



    function changeImg(e) {
        let files = e.target.files
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                //document.getElementById('rew').src = fr.result;
                setIng(fr.result)
                sent(fr.result)
            }
            fr.readAsDataURL(files[0]);
        }
    }

    const [ing, setIng] = useState<string | ArrayBuffer | null>(img)
    const [load, setload] = useState(false)


    async function sent(e) {
        await fetch('image', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ user_id: userState.user_id, image: e })
        })
    }

    async function get() {
        const data = await fetch(`image/${userState.user_id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
            });
        await changeState(data)
        setload(true)
    }

    function changeState(data) {
        if (data.user_id == userState.user_id)
            setIng("data:image/jpeg;base64," + data.image)
    }

    useEffect(() => {
        if (!load) {
            get()
        }
    })

    async function deleteImage(e) {
        setIng(img)
        const response = await fetch('image', {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(userState.user_id)
        })

    }

    return (
        <div className='pofile_container'>
            {/* <input onChange={(e) => changeImg(e)} type='file'></input>
            <img id='rew' className='avatar' src={ing}></img>
            <button onClick={() => get()}>Загрузить</button> */}
            <input id='fileInput' style={{ display: 'none' }} type="file" onChange={(e) => changeImg(e)} name="myImage" accept="image/*" />
            <div className="mainInfo">
                <div className="imageContainer">
                    {ing !== img ? <button type="button" onClick={(e) => deleteImage(e)} className="deleteItemButton">X</button> : null}

                    <img src={ing} className='avatar'></img>
                    <div onClick={() => document.getElementById('fileInput').click()} className='loadText'>Загрузить изображение</div>
                </div>

                <div className="userDescription">
                    <p className="username">{userState.l_name + ' ' + userState.f_name}</p>
                    <p>{userState.phone_number ? userState.phone_number : null}</p>
                    <p>{userState.email}</p>
                </div>

                <NavLink className="account_link" style={{ paddingLeft: '20px' }} tag={Link} to='/accountInfo'> Редактировать профиль</NavLink>
            </div>
            {
                //вынести в отдельный компанент ????
                userState.user_type != 'employer' ?
                    <div className="user_resumes_container">
                        <div style={{ width: "60%" }}>
                            <p className="profile_sect-title">Мое резюме</p>
                            {resumeState.resumeInfo.status === "del" ? <p>Заблокировано, необходимо внести изменения</p> : null}
                            {resumeState.resumeInfo.status === "dat" ? <p>Устарело, необходимо обновить данные</p> : null}
                            {resumeState.resumeInfo.desired_position ?
                                <div className="resumeCard">
                                    <div className="card_maininfo">
                                        <p className='card__title'>{resumeState.resumeInfo.desired_position}</p>
                                        <p className='card__subtitle'>{resumeState.resumeInfo.desired_salary} руб.</p>
                                        <p className='card__desc'>Уровень образования: {resumeState.resumeInfo.education_level}</p>
                                    </div>

                                    <div className="card_buttons">
                                        <button onClick={() => navigate('/resume')} className="resumeButton">Редактировать</button>
                                        <button onClick={() => delResume()} className="resumeButton">Удалить</button>
                                    </div>
                                </div>
                                : <NavLink className="account_link" tag={Link} to='/resume' >Создать резюме</NavLink>
                            }
                        </div>
                    </div>
                    : <CompanyProfile></CompanyProfile>
            }
        </div >
    );
}