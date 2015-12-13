import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import {reducer as form } from 'redux-form';
import auth from './auth';
import users from './users';
import login from './login';


export default combineReducers({
  router: routerStateReducer,
  auth,
  users,
  form,
  login
});
