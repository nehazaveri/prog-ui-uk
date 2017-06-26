import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'

import globalReducer from './globalReducer';
import creativeReducer from './creativeReducer'

export default combineReducers({
  creative: creativeReducer,
  global : globalReducer,
  routing: routerReducer
});
