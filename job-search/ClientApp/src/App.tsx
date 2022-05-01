import * as React from 'react';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Registration from './components/Registration';
import Account from './components/account/Account';
import Resume from './components/resumeForm/Resume';
import Vacancy from './components/vacancyForm/Vacancy';
import AccountInfo from './components/account/AccountInfo'
import './App.css';
import { createEmptyAccount, createEmptyResume, createEmptyCompany } from './exportFunctions';

import { AccountType, ResumeType, CompanyType } from './components/types';


import './custom.css'
import './media.css'
import { useEffect, useState } from 'react';
import NavMenu from './components/NavMenu';
import Company from './components/companyForm/Company';
import ResumeCard from './components/ResumeCard';
import VacancyCard from './components/VacancyCard';
import { useDispatch } from 'react-redux';
import { changeProfessionList } from './app/professionStateReducer';

function App() {

    // const [accountType, setAccountType] = useState('noRegistered')
    const [pageType, setPageType] = useState('vacancies')
    const [formType, setFormType] = useState('authoriz')

    // const [account, setAccount] = useState<AccountType>(createEmptyAccount())
    // const [resume, setResume] = useState<ResumeType>(createEmptyResume())
    // const [company, setCompany] = useState<CompanyType>(createEmptyCompany())
    // const [professionList, setProfessionList] = useState<{ profession_id: number, profession: string }[]>([])

    useEffect(() => {
        getprofessions()
    })
    const dispatch = useDispatch();
    // async function getprofessions() {
    //     const response = await fetch(`profession`)
    //     const data = await response.json();
    //     setProfessionList(data)
    // }
    async function getprofessions() {
        const response = await fetch(`profession`)
        let data = await response.json()
        dispatch(changeProfessionList({ professionState: data }))
    }

    return (
        <BrowserRouter>
            <NavMenu setregitrType={setFormType} setPageType={setPageType} />
            <Routes>
                <Route path='/' element={<Home pageType={pageType} />} />
                <Route path='/registration' element={<Registration formType={formType} setFormType={setFormType} setPageType={setPageType} />} />
                <Route path='/account' element={<Account />} />
                <Route path='/accountInfo' element={<AccountInfo />} />
                <Route path='/resume' element={<Resume />} />
                <Route path='/vacancy/:number' element={<Vacancy />} />
                <Route path='/company' element={<Company />} />

                <Route path='/resumecard/:number' element={<ResumeCard />} />
                <Route path='/vacancycard/:number' element={<VacancyCard />} />



                {/* <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
            </Routes>

        </BrowserRouter>
    );
}

export default App;
