import * as React from 'react';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Registration from './components/Registration';
import Account from './components/Account';
import { Check } from './components/Check';


import './custom.css'
import { useState } from 'react';
import NavMenu from './components/NavMenu';

function App() {

    const [accountType, setAccountType] = useState('noRegistered')
    return (
        // <Check></Check>
        <BrowserRouter>
            <NavMenu accountType={accountType} setAccountType={setAccountType} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/registration' element={<Registration setAccountType={setAccountType} />} />
                <Route path='/account' element={<Account accountType={accountType} />} />
                {/* <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
