"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import IshopTable from './components/IshopTable';

let ishopName='my shop';
let itemsArr=require('./shopitem.json');

ReactDOM.render(
    <IshopTable
        name={ishopName}
        ishopList={itemsArr}
    />
    , document.getElementById('container')
);


