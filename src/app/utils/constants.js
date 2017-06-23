import {createConstants} from './index';

export const constants = createConstants(
  'ADD_CREATIVE',
  'GET_CREATIVE_LIST',
  'GET_CREATIVES_SUCCESS',
  'SHOW_SPINNER',
  'HIDE_SPINNER',
  'SHOW_SUCCESS_BAR',
  'HIDE_SUCCESS_BAR',
  'SHOW_ERROR_BAR',
  'HIDE_ERROR_BAR'
);

export const APPLICATION_BASE_PATH = '/';
export const CREATIVE_PATH = `${APPLICATION_BASE_PATH}/creative`;

export const HTTP_RESPONSE_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};


