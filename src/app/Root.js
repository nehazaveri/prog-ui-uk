import { browserHistory , Router} from 'react-router';
import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, applyMiddleware , compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { IntlProvider,  addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import { routerMiddleware , syncHistoryWithStore } from 'react-router-redux';


import i18n from './localization/i18n.js';

import { initializeRoutes } from './routes';
import  rootReducers  from './reducers';

export default class Root extends Component {
  constructor(props) {
    super(props);

    injectTapEventPlugin();

    addLocaleData([en, de]);

    this.language = i18n.defaultLang;
    this.messages = i18n.intlData.messages;
    const middleware = routerMiddleware(browserHistory);

    this.routes = initializeRoutes();

    this.store = createStore(
      rootReducers,
      applyMiddleware(middleware, thunk)
    );

    this.history = syncHistoryWithStore(browserHistory, this.store);
  }


  render() {
    return (
      <IntlProvider locale={this.language} messages={this.messages}>
        <Provider store={this.store}>
          <Router history={this.history}>
            { this.routes }
          </Router>
        </Provider>
      </IntlProvider>
    );
  }
}
