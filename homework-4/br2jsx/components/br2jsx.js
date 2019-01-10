import React from 'react';
import PropTypes from 'prop-types';

import './br2jsx.css';

class Br2jsx extends React.Component {

    static propTypes = {
        string: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div>
                {this.props.string.split(/<br ?\/?>/).map(el => el = [el, <br key={el}/>])}
            </div>
        );
    }

}

export default Br2jsx;
