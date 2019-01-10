"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Br2jsx from './components/br2jsx';

let string="первый<br>второй<br/>третий<br />последний<br />предпоследний";

ReactDOM.render(
    <Br2jsx string={string}/>, document.getElementById('container')
);


