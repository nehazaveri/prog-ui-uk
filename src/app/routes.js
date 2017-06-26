import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';
//import {requireAuthentication} from './components/AuthenticatedComponent';
import AppLayout from './views/AppLayout';
import Terms from './views/terms/Terms';
import AboutUs from './views/terms/AboutUs';
import Error_NotFound from './views/404';
import Error_Forbidden from './views/403';
import CreativeOverview from './views/creative/CreativeOverview';

import {APPLICATION_BASE_PATH, CREATIVE_PATH} from './utils/constants';

export function initializeRoutes() {

  return (
    <Route path={ APPLICATION_BASE_PATH }>
      <IndexRedirect to={ CREATIVE_PATH }/>
      <Route path="creative" component={ CreativeOverview }>
        <IndexRoute component={CreativeOverview} />
      </Route>
      <Route path="404" component={ Error_NotFound }/>
      <Route path="403" component={ Error_Forbidden }/>
      <Redirect from="*" to={`${APPLICATION_BASE_PATH}/404`}/>
    </Route>
  );
}



