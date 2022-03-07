import * as React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import '../custom.css';
import { AccountType } from './types';


export default function NavMenu(props: { account: AccountType, setAccount: any; setPageType: any; }) {

    function nuvButton() {

        return (
            <div className='navigate'>
                <div className='container'>
                    <div className='row'>
                        <NavLink className='navigate_item navigate_home' tag={Link} to="/">Главная</NavLink>
                        <div className='sections_container'>
                            <NavLink className='navigate_item' onClick={() => props.setPageType('resumes')} tag={Link} to="/"> Работодателям</NavLink>
                            <NavLink className='navigate_item' onClick={() => props.setPageType('vacancies')} tag={Link} to="/"> Соискателям</NavLink>
                        </div>
                        {createNavigateItems()}
                    </div>
                </div>
            </div>
        )
    }



    function createNavigateItems() {
        if (props.account.user_type === 'noRegistered') {
            return (
                <div className='reg_container'>
                    <NavLink className='navigate_item' tag={Link} to="/registration">Вход</NavLink>
                    {/* <NavLink className='navigate_item' tag={Link} to="/registration">Регистрация</NavLink> */}
                </div>)
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

                    <NavLink className='navigate_item' onClick={() => props.setAccount({ email: '', password: '', f_name: '', l_name: '', phoneNumber: '', user_type: 'noRegistered' })} to='/' tag={Link} >Выход</NavLink>
                </div>)
        }
    }



    return (
        <div className="menu">
            {nuvButton()}
        </div>

    );

}
