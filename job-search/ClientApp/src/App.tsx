import * as React from 'react';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Registration from './components/Registration';
import Account from './components/account/Account';
import Resume from './components/resumeForm/Resume';
import Vacancy from './components/vacancyForm/Vacancy';
import { Check } from './components/Check';
import AccountInfo from './components/account/AccountInfo'
import './App.css';
import { createEmptyAccount, createEmptyResume, createEmptyCompany } from './exportFunctions';

import { AccountType, ResumeType, CompanyType } from './components/types';


import './custom.css'
import { useEffect, useState } from 'react';
import NavMenu from './components/NavMenu';
import Company from './components/companyForm/Company';
import ResumeCard from './components/ResumeCard';
import VacancyCard from './components/VacancyCard';

function App() {

    // const [accountType, setAccountType] = useState('noRegistered')
    const [pageType, setPageType] = useState('vacancies')
    const [account, setAccount] = useState<AccountType>(createEmptyAccount())
    const [resume, setResume] = useState<ResumeType>(createEmptyResume())
    const [company, setCompany] = useState<CompanyType>(createEmptyCompany())
    const [professionList, setProfessionList] = useState<{ profession_id: number, profession: string }[]>([])

    useEffect(() => {
        if (!professionList.length) {
            getprofessions()
        }
    })

    async function getprofessions() {
        const response = await fetch(`profession`)
        const data = await response.json();
        setProfessionList(data)
    }


    return (
        <BrowserRouter>
            <NavMenu account={account} setAccount={setAccount} setPageType={setPageType} />
            <Routes>
                <Route path='/' element={<Home professionList={professionList} pageType={pageType} accountType={account.user_type} />} />
                <Route path='/registration' element={<Registration setResume={setResume} account={account} setAccount={setAccount} setPageType={setPageType} accountType={account.user_type} />} />
                <Route path='/account' element={<Account setAccount={setAccount} setResume={setResume} setCompany={setCompany} account={account} resume={resume} company={company} />} />
                <Route path='/accountInfo' element={<AccountInfo setResume={setResume} setAccount={setAccount} account={account} resume={resume} />} />
                <Route path='/resume' element={<Resume setResume={setResume} resume={resume} />} />
                <Route path='/vacancy/:number' element={<Vacancy company={company} setCompany={setCompany} />} />
                <Route path='/company' element={<Company account={account} company={company} setCompany={setCompany} />} />

                <Route path='/resumecard/:number' element={<ResumeCard company={company} />} />
                <Route path='/vacancycard/:number' element={<VacancyCard resume={resume} />} />



                {/* <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
            </Routes>

        </BrowserRouter>
    );
}

export default App;
