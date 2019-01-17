"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

const clientsMts = require('./mobileClients.json').clientsMts;
const clientsVelcom = require('./mobileClients.json').clientsVelcom;

ReactDOM.render(
    <MobileCompany
        clientsMts={clientsMts}
        clientsVelcom={clientsVelcom}
    />
    , document.getElementById('container')
);

