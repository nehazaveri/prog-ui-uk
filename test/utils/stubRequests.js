import sinon from 'sinon';
import _ from 'lodash';
import * as httpUtils from '../../src/app/utils/httpUtils';

function stubRequest(requestArguments, responseMetadata, api) {
  const stubMakeGetRequest = sinon.stub(httpUtils, api);
  stubMakeGetRequest.withArgs(requestArguments);

  stubMakeGetRequest.resolves(new window.Response(JSON.stringify(responseMetadata.body), _.omit(responseMetadata, 'body')));

  return stubMakeGetRequest;
}

export function stubGetRequest({url, headers}, responseMetadata) {
  return stubRequest({url, headers}, responseMetadata, 'makeGetRequest');
}

export function stubSuccessfulGetRequest({url, headers}, responseBody) {
  return stubGetRequest({
    url,
    headers
  }, {
    body: responseBody,
    status: 200,
    statusText: 'OK'
  });
}

export function stubPostRequest({url, headers, body}, responseMetadata) {
  return stubRequest({url, headers, body}, responseMetadata, 'makePostRequest');
}

export function stubSuccessfulPostRequest({url, headers, body}) {
  return stubPostRequest({
    url,
    headers,
    body
  }, {
    status: 200,
    statusText: 'OK'
  });
}

export function stubPutRequest({url, headers, body}, responseMetadata) {
  return stubRequest({url, headers, body}, responseMetadata, 'makePutRequest');
}

export function stubSuccessfulPutRequest({url, headers, body}) {
  return stubPutRequest({
    url,
    headers,
    body
  }, {
    status: 200,
    statusText: 'OK'
  });
}

export function stubDeleteRequest({url, headers}, responseMetadata) {
  return stubRequest({url, headers}, responseMetadata, 'makeDeleteRequest');
}
