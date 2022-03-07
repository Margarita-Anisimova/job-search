import * as React from 'react';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Registration from './components/Registration';
import Account from './components/account/Account';
import Resume from './components/resumeForm/Resume';
import Vacancy from './components/vacancyForm/Vacancy';
import { Check } from './components/Check';
import './App.css';

import { VacancyType, ResumesType, CompanyType } from './components/types'



import './custom.css'
import { useState } from 'react';
import NavMenu from './components/NavMenu';
import Company from './components/companyForm/Company';
import VacancyCard from './components/VacancyCard';
import CopmaniesList from './components/CompaniesList';
import CompanyCard from './components/CompanyCard';

function App() {

    const [accountType, setAccountType] = useState('noRegistered')
    const [pageType, setPageType] = useState('vacancies')

    const [company, setcompany] = useState([])


    return (
        // <Check></Check>
        <BrowserRouter>
            <NavMenu accountType={accountType} pageType={pageType} setAccountType={setAccountType} setPageType={setPageType} />
            <Routes>
                <Route path='/' element={<Home pageType={pageType} accountType={accountType} />} />
                <Route path='/registration' element={<Registration setAccountType={setAccountType} setPageType={setPageType} />} />
                <Route path='/account' element={<Account accountType={accountType} />} />
                <Route path='/resume' element={<Resume />} />
                <Route path='/vacancy' element={<Vacancy />} />
                <Route path='/company' element={<Company />} />

                <Route path='/vacancycard' element={<VacancyCard />} />
                <Route path='/companies' element={<CopmaniesList />} />

                <Route path='/companycard' element={<CompanyCard results={company} />} />


                {/* <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
            </Routes>

        </BrowserRouter>
    );
}

export default App;
