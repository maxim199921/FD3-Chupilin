import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import Page_Company from './Page_Company';
import Page_Contacts from './Page_About';
import Page_Clients from './Page_Clients';
import './PagesLinks.css';

class PagesRouter extends React.Component {
          
  render() {

    return (
      <div>
          <div className="headerLink">
              <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">Компание</NavLink>
              <NavLink to="/company" className="PageLink" activeClassName="ActivePageLink">Связь</NavLink>
              <NavLink to="/clients" className="PageLink" activeClassName="ActivePageLink">Клиенты</NavLink>
          </div>
          <div className="mainLink">
              <Route path="/" exact component={Page_Company} />
              <Route path="/company" component={Page_Contacts} />
              <Route path="/clients" component={Page_Clients} />
          </div>
          <div className="footerLink">footer</div>
      </div>
    );
    
  }

}
    
export default PagesRouter;
    