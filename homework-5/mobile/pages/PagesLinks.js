import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './PagesLinks.css';

class PagesLinks extends React.Component {
          
  render() {

    return (
      <div>
        <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">Компание</NavLink>
        <NavLink to="/company" className="PageLink" activeClassName="ActivePageLink">Связь</NavLink>
        <NavLink to="/clients" className="PageLink" activeClassName="ActivePageLink">Клиенты</NavLink>
      </div>
    );
    
  }

}
    
export default PagesLinks;
    