import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Spinner from '../../../src/app/components/Spinner';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let mockStore;

describe('<Spinner /> Component', () => {
  before(() => {
    mockStore = configureStore([]);
  });

  describe('Render', () => {
    it(`should render correctly when global 'showSpinner' flag is set`, () => {
      const initialState = {global: { showSpinner: true}},
        store = mockStore(initialState),
        wrapper = mount(
          <Provider store={store}>
            <MuiThemeProvider>
              <Spinner />
            </MuiThemeProvider>
          </Provider>
        );

      const spinner = wrapper.find('div#spinnerWrapper');
      expect(spinner.exists()).to.equal(true);
      expect(wrapper.find('CircularProgress').exists()).to.equal(true);
    });

    it(`should not render circular spinner when global 'showSpinner' flag is unset`, () => {
      const initialState = {global: { showSpinner: false}},
        store = mockStore(initialState),
        wrapper = mount(
          <Provider store={store}>
            <MuiThemeProvider>
              <Spinner />
            </MuiThemeProvider>
          </Provider>
        );

      const spinner = wrapper.find('div#spinnerWrapper');
      expect(spinner.exists()).to.equal(false);
      expect(wrapper.find('CircularProgress').exists()).to.equal(false);
    });
  });
});
