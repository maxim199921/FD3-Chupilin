import React from 'react';
import PropTypes from 'prop-types';

import './br2jsx.css';

const Br2jsx = props => <div>{props.string.split(/<br ?\/?>/).map(el => el = [el, <br key={el}/>])}</div>;

Br2jsx.propTypes = {
    string: PropTypes.string.isRequired,
};

export default Br2jsx;
