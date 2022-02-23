import * as React from 'react';
import { connect } from 'react-redux';
import Resume from './Resume';
import Vacancy from './Vacancy';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {

  const [state, setState] = useState({ state: 'resume' })

  function createList() {
    return state.state === 'resume' ? <Resume></Resume> : <Vacancy></Vacancy>
  }

  return (


    <div>
      Главная страница
      <input value='Найти'>
      </input>
      <button onClick={() => setState({ state: 'resume' })}>
        Вакансии
      </button>
      <button onClick={() => setState({ state: 'vacancy' })}>
        Резюме
      </button>
      {createList()}

    </div>
  );
}

