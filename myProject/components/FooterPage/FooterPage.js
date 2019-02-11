import React from 'react';
import PropTypes from 'prop-types';

import './FooterPage.css';

class FooterPage extends React.PureComponent {

    static propTypes = {
        //name: PropTypes.string.isRequired,
    };

    render() {

        return (
            <div className="footerLink">
                <div className="container">
                    <div className="row no-gutters align-items-center footer-wrapper">
                        <div className="col-12 col-md-8 footerLink-info">Developed by: M.C.Chupilin</div>
                        <div className="col-md-4 footerLink-logo"></div>
                    </div>
                </div>
            </div>
        );
    }

}

export default FooterPage;
