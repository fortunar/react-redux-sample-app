import cookie from 'react-cookie';
import {LOGOUT} from './auth';

const LOGIN = 'around/auth/LOGIN';
const LOGIN_SUCCESS = 'around/auth/LOGIN_SUCCESS';
const LOGIN_SUCCESS_REDIRECT = 'around/auth/LOGIN_SUCCESS_REDIRECT';
const LOGIN_FAIL = 'around/auth/LOGIN_FAIL';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      console.log('LOGIN SUCCESS');
      console.log(action);
      return {
        ...state,
        loggingIn: false,
        loginError: null,
        userId: cookie.load('around_user_id'),
        token: cookie.load('around_token')
      };
    case LOGIN_SUCCESS_REDIRECT:
      return {
        ...state,
        loggingIn: false,
        userId: action.data.userId,
        token: action.data.token
      };
    case LOGIN_FAIL:
      console.log('LOGIN FAIL');
      console.log(action);
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error.message
      };
    case LOGOUT:
      console.log('AUTH LOGOUT');
      cookie.remove('around_token');
      cookie.remove('around_user_id');
      return {
        ...state,
        userId: null,
        token: null
      };
    default:
      return state;
  }
}

export function isLoggedIn(globalState) {
  return globalState.auth.login.userId;
}

export function updateUserData(cookieToken, cookieUserId) {
  return {
    type: LOGIN_SUCCESS_REDIRECT,
    data: {'token': cookieToken, 'userId': cookieUserId}
  };
}

export function loginEmailPass(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login/local', {
      data: {
        email: email,
        password: password
      }
    })
  };
}
