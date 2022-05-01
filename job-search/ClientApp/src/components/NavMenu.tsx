import * as React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import '../custom.css';
import { AccountType } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from "../app/userStateReducer";
import { createEmptyAccount, createEmptyResume, createEmptyCompany } from '../exportFunctions';
import { changeResume } from '../app/resumeStateReducer';
import { changeCompany } from '../app/companyStateReducer';
import { useEffect } from 'react';
import { useState } from 'react';

export default function NavMenu(props: { setregitrType: any, setPageType: any; }) {


    const userState = useSelector((state: any) => state.userState.userState)
    let a = useSelector((state: any) => state)
    const dispatch = useDispatch();

    const [isActive, setActive] = useState(false);

    function nuvButton() {

        return (
            <div className='navigate'>
                <div className='container'>
                    <div className={isActive ? 'row nav_menu_active nav_menu' : 'row nav_menu'}>
                        <div className='sections_container'>
                            <NavLink className='navigate_item navigate_home' tag={Link} to="/">Главная</NavLink>
                            <div className="search_type">
                                <NavLink className='navigate_item' onClick={() => props.setPageType('resumes')} tag={Link} to="/"> Работодателям</NavLink>
                                <NavLink className='navigate_item' onClick={() => props.setPageType('vacancies')} tag={Link} to="/"> Соискателям</NavLink>
                            </div>
                        </div>
                        {createNavigateItems()}

                    </div>

                </div>
            </div>
        )
    }



    function createNavigateItems() {
        if (userState.user_type === 'noRegistered') {
            return (
                <div className='reg_container'>

                    <NavLink className='navigate_item' onClick={() => props.setregitrType('authoriz')} tag={Link} to="/registration">Вход</NavLink>
                    <NavLink className='navigate_item' onClick={() => props.setregitrType('registr')} tag={Link} to="/registration">Регистрация</NavLink>
                </div>
            )
        } else {
            return (
                <div className='reg_container'>
                    {/*временно, создать кнопку*/}
                    {/* {props.account.user_type === 'applicant' ?
                        <NavLink className='navigate_item' tag={Link} to="/resume">Создать резюме</NavLink> :
                        <span>
                            <NavLink className='navigate_item' tag={Link} to="/vacancy">Создать вакансию</NavLink>
                            <NavLink className='navigate_item' tag={Link} to="/company">Создать компанию</NavLink></span>} */}



                    <NavLink className='navigate_item' tag={Link} to="/account">Личный кабинет</NavLink>

                    <NavLink className='navigate_item' onClick={out} to='/' tag={Link} >Выход</NavLink>


                </div>)
        }
    }

    function out() {
        dispatch(changeUser({ userState: createEmptyAccount() }))
        dispatch(changeResume({ resumeState: createEmptyResume() }))
        dispatch(changeCompany({ companyState: createEmptyCompany() }))
        document.cookie = 'user_id=' + encodeURIComponent(0)
        document.cookie = 'user_type=' + encodeURIComponent('noRegistered')
    }

    return (
        <div className="menu">
            <button onClick={() => setActive(!isActive)} className={isActive ? 'menu_toggle_active' : 'menu_toggle'}></button>
            {nuvButton()}
        </div>

    );

}
