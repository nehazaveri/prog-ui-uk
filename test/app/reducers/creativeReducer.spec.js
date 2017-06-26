import React from 'react';
import {Shallow} from 'enzyme';
import {expect} from 'chai';
import creativeReducer from '../../../src/app/reducers/creativeReducer';
import {constants} from '../../../src/app/utils/constants';

describe('Creative Reducer ', () => {
  const INITIAL_STATE = {
    creatives: null
  };
  Object.freeze(INITIAL_STATE);

  describe(constants.GET_CREATIVES_SUCCESS, () => {
    it(`should correctly populate 'creatives' field`, () => {
      const newCreative = [{
          id: 1,
          name: 'test creative'
        }],
        newState = creativeReducer(INITIAL_STATE, {
          type: constants.GET_CREATIVES_SUCCESS,
          payload: {
            creatives: newCreative
          }
        });

      expect(newState).to.not.equal(undefined);
      expect(newState).to.not.equal(INITIAL_STATE);
      expect(newState).to.not.eql(INITIAL_STATE);
      expect(newState).to.eql(Object.assign({}, INITIAL_STATE, {
        creatives: newCreative
      }));
      expect(newState.creatives).to.not.equal(newCreative);
    });

    it(`should not update 'creatives' on incorrect action type`, () => {
      const newCreatives = [{
          id: 1,
          name: 'test creative'
        }],
        newState = creativeReducer(INITIAL_STATE, {
          type: `${constants.GET_CREATIVES_SUCCESS}_random`,
          payload: {
            creatives: newCreatives
          }
        });

      expect(newState).to.not.equal(undefined);
      expect(newState).to.equal(INITIAL_STATE);
    });

    it(`should not update 'creatives' on incorrect payload`, () => {
      const newCreatives = [{
          id: 1,
          name: 'test creatives'
        }],
        newState = creativeReducer(INITIAL_STATE, {
          type: constants.GET_CREATIVES_SUCCESS,
          payload: {
            creatives_random: newCreatives
          }
        });

      expect(newState).to.not.equal(undefined);
      expect(newState).to.equal(INITIAL_STATE);
    });
  });
});
