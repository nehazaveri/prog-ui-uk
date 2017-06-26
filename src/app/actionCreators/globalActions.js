import {constants} from '../utils/constants';

export function showSpinner() {
  return {
    type: constants.SHOW_SPINNER
  }
}

export function hideSpinner() {
  return {
    type: constants.HIDE_SPINNER
  }
}

export function hideSuccessBar() {
  return {
    type: constants.HIDE_SUCCESS_BAR
  }
}

export function showSuccessBar(message) {
  return {
    type: constants.SHOW_SUCCESS_BAR,
    payload: {
      message
    }
  }
}

export function hideErrorBar() {
  return {
    type: constants.HIDE_ERROR_BAR
  }
}

export function showErrorBar(message) {
  return {
    type: constants.SHOW_ERROR_BAR,
    payload: {
      message
    }
  }
}

export function showErrorBarWithError(message, err) {
  message = err && err.message ? `${message} ${err.message}` : message;

  return {
    type: constants.SHOW_ERROR_BAR,
    payload: {
      message
    }
  }
}
