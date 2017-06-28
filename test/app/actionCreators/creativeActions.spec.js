import React from 'react';
import {expect} from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import _ from 'lodash';
import sinon from 'sinon';

import {getCreativesSuccess, fetchCreativeList, uploadCreative} from '../../../src/app/actionCreators/creativeActions';
import {showSpinner, hideSpinner, showSuccessBar, showErrorBarWithError} from '../../../src/app/actionCreators/globalActions';
import {initialState} from '../../../src/app/reducers/creativeReducer';
import {constants} from '../../../src/app/utils/constants';
import Creative from '../../../src/app/model/creative'
import {stubGetRequest, stubSuccessfulGetRequest, stubPostRequest, stubSuccessfulPostRequest, stubPutRequest, stubSuccessfulPutRequest} from '../../utils/stubRequests';

describe('Creative Actions', () => {
  const creatives = [{
    "id": 4240,
    "creativeTitle": "TEST_AB_N1",
    "advertiser": "00001",
    "product": "00001"
    },{
     "id": 3211,
    "creativeTitle": "TEST_AB_N2",
    "advertiser": "00002",
    "product": "00003"
  }],
    BASE_URL = `${APP_CONSTANTS.ENDPOINTS.ACCOUNT_API_URL}/creative`;

  Object.freeze(creatives);

  describe('synchronous actions', () => {
    it(`should correctly create 'getCreativesSuccess' action`, () => {
      expect(getCreativesSuccess(creatives)).to.eql({
        type: constants.GET_CREATIVES_SUCCESS,
        payload: {
          creatives
        }
      });
    });
  });

  describe('asynchronous actions', () => {
    let mockStore, stubConsoleError;

    before(() => {
      mockStore = configureMockStore([ thunk ]);
      stubConsoleError = sinon.stub(console, 'error');
    });

    after(() => {
      stubConsoleError.restore();
    });

    describe('fetchCreativeList', () => {
      it(`should correctly create and dispatch other actions`, (done) => {
        const store = mockStore(Object.assign({}, initialState)),
          stubMakeGetRequest = stubSuccessfulGetRequest({ url: BASE_URL }, creatives);

        store.dispatch(fetchCreativeList()).then(() => {
          expect(stubMakeGetRequest.callCount).to.equal(1);
          expect(store.getActions()).to.eql([
            showSpinner(),
            getCreativesSuccess(creatives),
            hideSpinner()
          ]);

          stubMakeGetRequest.restore();

          done();
        }).catch(e => {
          stubMakeGetRequest.restore();

          done(e);
        });
      });

      it(`should correctly handle and dispatch actions when api returns 501 error`, (done) => {
        const store = mockStore(Object.assign({}, initialState)),
          stubMakeGetRequest = stubGetRequest({ url: BASE_URL }, {
            status: 501,
            statusText: 'Internal Server Error'
          });

        store.dispatch(fetchCreativeList()).then(() => {
          expect(stubMakeGetRequest.callCount).to.equal(1);
          expect(store.getActions()).to.eql([
            showSpinner(),
            hideSpinner(),
            showErrorBarWithError(`Failed to fetch creatives! Internal Server Error`, new Error())
          ]);
          stubMakeGetRequest.restore();

          done();
        }).catch(e => {
          stubMakeGetRequest.restore();

          done(e);
        });
      });
    });

    describe('uploadCreative',() => {
        it(`should correctly uploadCreative and dispatch other actions`, (done) => {
            const creative = {
            "contentMetaData":{
                "id": 4240,
                "title": "TEST_AB_N1",
                "advertiser": "00001",
                "product": "00001"
                }
            },
            blob = new Blob([""], { type: 'text/html' });
            blob["lastModifiedDate"] = "";
            blob["name"] = "filename.png";

            let creativeObj = new Creative('TEST_AB_N1','00001','00001',blob);
            const store = mockStore(Object.assign({}, initialState)),
                stubMakePostRequest = stubSuccessfulPostRequest({
                    url: BASE_URL ,
                    headers : {
                        'Content-Type': 'multipart/form-data'
                    },
                    body : creativeObj
                }),
                stubMakeGetRequest = stubSuccessfulGetRequest({url : BASE_URL}, creative),
                successCallbackSpy = sinon.spy();
            store.dispatch(uploadCreative(creativeObj,successCallbackSpy)).then(() => {
                  expect(stubMakePostRequest.callCount).to.equal(1);

                  expect(store.getActions()).to.eql([
                    showSpinner(),
                    showSpinner(),
                    getCreativesSuccess(creative),
                    hideSpinner(),
                    showSuccessBar(`Creative '${creative.contentMetaData.title}' uploaded successfully`)
                  ]);

                  stubMakePostRequest.restore();
                  stubMakeGetRequest.restore();

                  done();
                }).catch(e => {
                  stubMakeGetRequest.restore();

                  done(e);
                });
              });
        })
    });
  });

