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
import { useState } from 'react';
import NavMenu from './components/NavMenu';
import Company from './components/companyForm/Company';

function App() {

    // const [accountType, setAccountType] = useState('noRegistered')
    const [pageType, setPageType] = useState('vacancies')
    const [account, setAccount] = useState<AccountType>(createEmptyAccount())
    const [resume, setResume] = useState<ResumeType>(createEmptyResume())
    const [company, setCompany] = useState<CompanyType>(createEmptyCompany())

    return (
        // <Check></Check> 
        <BrowserRouter>
            <NavMenu account={account} setAccount={setAccount} setPageType={setPageType} />
            <Routes>
                <Route path='/' element={<Home pageType={pageType} accountType={account.user_type} />} />
                <Route path='/registration' element={<Registration setResume={setResume} setAccount={setAccount} setPageType={setPageType} accountType={account.user_type} />} />
                <Route path='/account' element={<Account setCompany={setCompany} account={account} resume={resume} company={company} />} />
                <Route path='/accountInfo' element={<AccountInfo setResume={setResume} setAccount={setAccount} account={account} resume={resume} />} />
                <Route path='/resume' element={<Resume setResume={setResume} resume={resume} />} />
                <Route path='/vacancy/:number' element={<Vacancy company={company} setCompany={setCompany} />} />
                <Route path='/company' element={<Company company={company} setCompany={setCompany} />} />

                {/* <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
            </Routes>

        </BrowserRouter>
    );
}

export default App;
