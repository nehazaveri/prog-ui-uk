import {createReducer} from '../utils';
import {constants} from '../utils/constants';
import {helperSortFunc, helperSortFuncInt} from '../utils';
import _ from 'lodash';

export const initialState = {
  creatives: null
};

export default createReducer(initialState, {
  [constants.GET_CREATIVES_SUCCESS]: (state, payload) => {
    if (payload.hasOwnProperty('creatives')) {
      return Object.assign({}, state, {
        'creatives': _.cloneDeep(payload.creatives)
      });
    }
    return state;
  }
});