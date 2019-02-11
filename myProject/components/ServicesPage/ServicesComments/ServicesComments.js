import React from 'react';
import PropTypes from 'prop-types';

import './ServicesComments.css';

class ServicesComments extends React.PureComponent {

    static propTypes = {
        info: PropTypes.shape({
            name: PropTypes.string.isRequired,
            comment: PropTypes.string.isRequired,
        }),
    };

    render() {

        return (
            <div className="col-md-12 ServicesComments">
                <div className="row no-gutters ServicesComments-wrapper">
                    <div className="col-12 col-lg-4 col-xl-3 align-self-center ServicesComments-name">{this.props.info.name}</div>
                    <div className="col-12 col-lg-8 col-xl-9 align-self-center ServicesComments-comment">{this.props.info.comment}</div>
                </div>
            </div>
        );

    }

}

export default ServicesComments;
