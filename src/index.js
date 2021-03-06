import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from "./redux/reducers";
import './index.css';
import './styles/main.css';
import './styles/modals.css';
import './styles/normalize.css';
import App from './App';
import "./i18n";

const store = createStore(reducers);
window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
