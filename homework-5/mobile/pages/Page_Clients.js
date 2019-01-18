"use strict";

import React from 'react';
import MobileCompany from '../components/MobileCompany';

const clientsMts = require('../mobileClients.json').clientsMts;
const clientsVelcom = require('../mobileClients.json').clientsVelcom;

class Page_Company extends React.PureComponent {

    render() {
        return (
            <MobileCompany
                clientsMts={clientsMts}
                clientsVelcom={clientsVelcom}
            />
        );
    }
}
    
export default Page_Company;
    