import * as React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default function NavMenu(props: { accountType: string; setAccountType: any; }) {

    function nuvButton() {
        if (props.accountType === 'noRegistered') {
            return (
                <div className='navigate'>
                    <NavItem>
                        <NavLink tag={Link} to="/">Главная</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/registration">Вход</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/registration">Регистрация</NavLink>
                    </NavItem>
                </div>
            )
        } else {
            return (
                <div className='navigate'>
                    <NavItem>
                        <NavLink tag={Link} to="/">Главная</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/account">Личный кабинет</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => props.setAccountType('noRegistered')} to='/' tag={Link} >Выход</NavLink>
                    </NavItem>
                </div>
            )
        }
    }

    return (
        <div className="menu">
            {nuvButton()}
        </div>

    );

}
