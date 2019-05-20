import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'popper.js';

import Main from './components/main/main';


import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore({});

let data= {
    data:{
        '1': { id: '1', name: "Start Time"},
        '2': { id: '2', name: "Stop Time"},
        '3': { id: '3', name: "Per Point"},
        '4': { id: '4', name: "Initial Margin"},
        '5': { id: '5', name: "Change %"},
        '6': { id: '6', name: "Change"},
        '7': { id: '7', name: "Last"},
        '8': { id: '8', name: "Last Volume"},
        '9': { id: '9', name: "Bid"},
        '10': { id: '10', name: "Bid Size"},
        '11': { id: '11', name: "Ask"},
        '12': { id: '12', name: "Ask Size"},
        '13': { id: '13', name: "Total Volume"},
        '14': { id: '14', name: "Start Time"}
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'available',
            itemIds: ['1', '2', '3', '4']
        },
        'column-2': {
            id: 'column-2',
            title: 'visible',
            itemIds: ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
        }
    },
    columnOrder: ['column-1', 'column-2'],
    numberDisableItem: 6
};

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Main
                data={1}
            />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

