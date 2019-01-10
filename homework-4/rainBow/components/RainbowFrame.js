import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {

    static propTypes = {
        color: PropTypes.array.isRequired,
    };

    render() {
        return (
            this.props.color.length !== 0
            ? <div style={{border: "solid 34px " + this.props.color[0], padding: "10px"}}>
                    <RainbowFrame color={this.props.color.splice(1)}>
                        {this.props.children}
                    </RainbowFrame>
               </div>
            : <span>{this.props.children}</span>
        );
    }

}

export default RainbowFrame;
