import { combineReducers } from 'redux';

import login from './login';
import user from './user';

export default combineReducers({
  login,
  user
});

export const LOGOUT = 'around/auth/LOGOUT';

export function logout() {
  return {
    type: LOGOUT
  };
}
