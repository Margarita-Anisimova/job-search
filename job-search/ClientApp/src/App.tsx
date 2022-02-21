import * as React from 'react';
import Layout from './components/Layout';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Registration from './components/Registration';
import Account from './components/Account';


import './custom.css'
import { useState } from 'react';
import NavMenu from './components/NavMenu';

function App() {

    const [accountType, setAccountType] = useState('noRegistered')
    return (
        <BrowserRouter>
            <NavMenu accountType={accountType} setAccountType={setAccountType} />
            <Switch>
                <Route path='/' element={<Home />} />
                <Route path='/registration' element={<Registration setAccountType={setAccountType} />} />
                <Route path='/account' element={<Account accountType={accountType} />} />
                {/* <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
            </Switch>
        </BrowserRouter>
    );
}

export default App;
