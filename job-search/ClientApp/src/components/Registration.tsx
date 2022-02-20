
import React from "react";
import { useState } from "react";
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

function Registration(props: { setAccountType: any; }) {

    return (
        <div>
            Страница регистрации
            <NavItem style={{ listStyle: 'none' }}>
                <NavLink onClick={() => props.setAccountType('applicant')} tag={Link} to="/">Зарегистрироваться как соискатель</NavLink>
            </NavItem>
            <NavItem style={{ listStyle: 'none' }}>
                <NavLink onClick={() => props.setAccountType('employer')} tag={Link} to="/">Зарегистрироваться как работодатель</NavLink>
            </NavItem>
        </div >
    );
}

export default Registration;
