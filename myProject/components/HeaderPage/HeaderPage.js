import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import './HeaderPage.css';

class HeaderPage extends React.Component {

    static propTypes = {
        //name: PropTypes.string.isRequired,
    };

    render() {

        return (
            <div className="headerLink">
                <div className="container">
                    <div className="row no-gutters align-items-center headerNav">
                        <div className="col-md-4 headerLink-Logo"></div>
                        <div className="col-md-8 headerLink-mainNav">
                            <NavLink to="/" exact className='btn-nav' activeClassName="ActivePageLink">Home</NavLink>
                            <NavLink to="/servicespage" className='btn-nav' activeClassName="ActivePageLink">Services</NavLink>
                            <NavLink to="/catalogpage" className='btn-nav' activeClassName="ActivePageLink">Catalog</NavLink>
                            <NavLink to="/basketpage" className='btn-nav btn-basket' activeClassName="ActivePageLink">Basket</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderPage;
