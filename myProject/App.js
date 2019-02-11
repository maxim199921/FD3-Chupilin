"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore({});

import MainPage from './components/main';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <MainPage />
        </BrowserRouter>
    </Provider>
    , document.getElementById('container') );
