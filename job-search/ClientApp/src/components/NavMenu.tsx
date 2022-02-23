import * as React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default function NavMenu(props: { accountType: string; setAccountType: any; }) {

    function nuvButton() {

        return (
            <div className='navigate'>
                <NavLink className='navigate_item navigate_home' tag={Link} to="/">Главная</NavLink>
                <div className='sections_container'>
                    <NavLink className='navigate_item' tag={Link} to="/"> Работадателям</NavLink>
                    <NavLink className='navigate_item' tag={Link} to="/"> Соискателям</NavLink>
                </div>
                {createNavigateItems()}
            </div>)
    }


    function createNavigateItems() {
        if (props.accountType === 'noRegistered') {
            return (
                <div className='reg_container'>
                    <NavLink className='navigate_item' tag={Link} to="/registration">Вход</NavLink>
                    <NavLink className='navigate_item' tag={Link} to="/registration">Регистрация</NavLink>
                </div>)
        } else {
            return (
                <div className='reg_container'>
                    <NavLink className='navigate_item' tag={Link} to="/account">Личный кабинет</NavLink>
                    <NavLink className='navigate_item' onClick={() => props.setAccountType('noRegistered')} to='/' tag={Link} >Выход</NavLink>
                </div>)
        }
    }



    return (
        <div className="menu">
            {nuvButton()}
        </div>

    );

}
