import 'whatwg-fetch';
import { HTTP_RESPONSE_CODE } from './constants';
//import {USER_DATA} from './localStorage';

//function getToken() {
//  // Retrieves the user token from localStorage
//  return USER_DATA.get('access_token');
//}

function getHeaders() {
  return {
    'Content-Type': 'application/json'
//    'Authorization': 'Bearer ' + getToken()
  };
}


export function getResponseJson(response) {
  try {
    return new Promise((resolve, reject) => {
      response.json().then(responseJson => {
        resolve(responseJson);
      }).catch(() => {
        resolve({});
      })
    });
  } catch(ex) {
    throw new Error('Could not parse json from response', ex);
  }
}

export function checkAndGetResponse(response) {
  if (response.status >= HTTP_RESPONSE_CODE.OK && response.status < 300) {
    if (response.status === HTTP_RESPONSE_CODE.CREATED || response.status === HTTP_RESPONSE_CODE.NO_CONTENT) {
      return Promise.resolve(response);
    }
    return getResponseJson(response);
  } else {

    return new Promise((resolve, reject) => {
      const error = new Error();
      error.message = (response && response.statusText) || 'Something went wrong! Please try again later.';

      //check for existing message into response
      if (response !== null && response.status >= HTTP_RESPONSE_CODE.BAD_REQUEST && response.status < HTTP_RESPONSE_CODE.INTERNAL_SERVER_ERROR) {

        getResponseJson(response).then(parsedResponse => {
          if (parsedResponse.message) {
            error.message = parsedResponse.message;
          }
          reject(error);
        });
      } else {
        reject(error);
      }
    });
  }
}

export function makeRequest(url, method, headers, body) {
  return fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });
}

export function makeGetRequest({url, headers}) {
  return makeRequest(url, 'GET', Object.assign({}, getHeaders(), headers));
}

export function makePostRequest({url, headers, body}) {
  return makeRequest(url, 'POST', Object.assign({}, getHeaders(), headers), body);
}

export function makePutRequest({url, headers, body}) {
  return makeRequest(url, 'PUT', Object.assign({}, getHeaders(), headers), body);
}

export function makePatchRequest({url, headers, body}) {
  return makeRequest(url, 'PATCH', Object.assign({}, getHeaders(), headers), body);
}

export function makeDeleteRequest({url, headers}) {
  return makeRequest(url, 'DELETE', Object.assign({}, getHeaders(), headers));
}
