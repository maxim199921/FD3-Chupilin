"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import RainbowFrame from './components/RainbowFrame';

let color = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];


ReactDOM.render(
    <RainbowFrame color={color}>{'RAINBOW RAINBOW RAINBOW RAINBOW RAINBOW RAINBOW RAINBOW RAINBOW RAINBOW'}</RainbowFrame>
    , document.getElementById('container')
);


