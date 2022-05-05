import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Registration from './components/Registration';
import Account from './components/account/Account';
import Resume from './components/resumeForm/Resume';
import Vacancy from './components/vacancyForm/Vacancy';
import AccountInfo from './components/account/AccountInfo'
import './App.css';


import './custom.css'
import './media.css'
import { useEffect, useState } from 'react';
import NavMenu from './components/NavMenu';
import Company from './components/companyForm/Company';
import ResumeCard from './components/ResumeCard';
import VacancyCard from './components/VacancyCard';
import { useDispatch } from 'react-redux';
import { changeProfessionList } from './app/professionStateReducer';
import { changeCityList } from './app/cityStateReduser';
import RegistrNewEmployer from './components/account/RegistrNewEmployer';
import AdminVacancies from './components/AdminVacancies';
import AdminResumes from './components/AdminResumes';

function App() {

    const [pageType, setPageType] = useState('vacancies')
    const [formType, setFormType] = useState('authoriz')


    useEffect(() => {
        getprofessions()
    })
    const dispatch = useDispatch();

    async function getprofessions() {
        const response = await fetch(`professionAndCity`)
        let data = await response.json()
        dispatch(changeProfessionList({ professionState: data.professions }))
        dispatch(changeCityList({ cityState: data.cities }))
    }


    return (
        <BrowserRouter>
            <NavMenu setregitrType={setFormType} setPageType={setPageType} />
            <Routes>
                <Route path='/' element={<Home pageType={pageType} />} />
                <Route path='/registration' element={<Registration formType={formType} setFormType={setFormType} setPageType={setPageType} />} />
                <Route path='/account' element={<Account />} />
                <Route path='/newEmployee' element={<RegistrNewEmployer />} />
                <Route path='/accountInfo' element={<AccountInfo />} />
                <Route path='/resume' element={<Resume />} />
                <Route path='/vacancy/:number' element={<Vacancy />} />
                <Route path='/company' element={<Company />} />
                <Route path='/resumecard/:number' element={<ResumeCard />} />
                <Route path='/vacancycard/:number' element={<VacancyCard />} />
                <Route path="/adminVacancies" element={<AdminVacancies />} />
                <Route path="/adminResumes" element={<AdminResumes />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
