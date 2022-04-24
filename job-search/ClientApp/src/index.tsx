import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./app/store";
import './App.css';
<style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');
</style>

// import "./libs/bootstrap/css/bootstrap-reboot.min.css";
// import "./libs/bootstrap/css/bootstrap-grid.min.css";

// Create browser history to use in the Redux store
// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
// const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
// const store = configureStore(history);
let persistor = persistStore(store);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="content">
                    <App />
                </div>
            </PersistGate>

            <footer className='footer' >
                <p>2022 © Анисимова Маргарита, Кадочникова Марина</p>
                <address>Екатеринбург</address>
            </footer>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'));

