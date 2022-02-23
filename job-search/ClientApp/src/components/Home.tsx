import * as React from 'react';
import { connect } from 'react-redux';
import Resume from './Resume';
import Vacancy from './Vacancy';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Home.css';


export default function Home() {

  const [state, setState] = useState({ state: 'resume' })

  function createList() {
    return state.state === 'resume' ? <Resume></Resume> : <Vacancy></Vacancy>
  }

  return (
    <div className="home_container">
      <p className="home-title">Работа найдется для каждого</p>
      <section>
        <input value='Найти' />
        <button onClick={() => setState({ state: 'resume' })}>
          Вакансии
        </button>
        <button onClick={() => setState({ state: 'vacancy' })}>
          Резюме
        </button>
      </section>
      <section>
        {createList()}
      </section>

    </div >
  );
}

