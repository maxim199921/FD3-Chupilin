import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Page_Company from './Page_Company';
import Page_Contacts from './Page_About';
import Page_Clients from './Page_Clients';

class PagesRouter extends React.Component {
          
  render() {

    return (
      <div>
        <Route path="/" exact component={Page_Company} />
        <Route path="/company" component={Page_Contacts} />
        <Route path="/clients" component={Page_Clients} />
        <Route path="/client/mts" component={Page_Clients} />
        <Route path="/client/velcom" component={Page_Clients} />
      </div>
    );
    
  }

}
    
export default PagesRouter;
    