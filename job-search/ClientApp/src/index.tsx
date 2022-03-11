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

            <div className='footer' >
                <p>Все права защищены.</p>
                <address>Адресс</address>
            </div>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'));

registerServiceWorker();
