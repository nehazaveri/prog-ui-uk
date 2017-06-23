import {constants} from '../utils/constants';
import {createReducer} from '../utils';

const initialState = {
  showSpinner: false,
  showSuccessBar: false,
  successBarMessage: '',
  showErrorBar: false,
  errorBarMessage: ''
};

export default createReducer(initialState, {
  [constants.SHOW_SPINNER]: (state) => {
    return Object.assign({}, state, {
      'showSpinner': true
    });
  },
  [constants.HIDE_SPINNER]: (state) => {
    return Object.assign({}, state, {
      'showSpinner': false
    });
  },
  [constants.SHOW_SUCCESS_BAR]: (state, payload) => {
    return Object.assign({}, state, {
      'showSuccessBar': true,
      'successBarMessage': payload.message
    });
  },
  [constants.HIDE_SUCCESS_BAR]: (state) => {
    return Object.assign({}, state, {
      'showSuccessBar': false,
      'successBarMessage': ''
    });
  },
  [constants.SHOW_ERROR_BAR]: (state, payload) => {
    return Object.assign({}, state, {
      'showErrorBar': true,
      'errorBarMessage': payload.message
    });
  },
  [constants.HIDE_ERROR_BAR]: (state) => {
    return Object.assign({}, state, {
      'showErrorBar': false,
      'errorBarMessage': ''
    });
  }
});
