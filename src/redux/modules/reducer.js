import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import {reducer as form } from 'redux-form';
import auth from './auth';
import users from './users';


export default combineReducers({
  router: routerStateReducer,
  auth,
  users,
  form
});
