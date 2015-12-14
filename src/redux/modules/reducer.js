import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import {reducer as form } from 'redux-form';
import users from './users';
import auth from './auth';

import { reducer as notifReducer } from 're-notif';

export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
  notifs: notifReducer,
  users
});
