import cookie from 'react-cookie';

const LOGIN = 'around/auth/LOGIN';
const LOGIN_SUCCESS = 'around/auth/LOGIN_SUCCESS';
const LOGIN_SUCCESS_REDIRECT = 'around/auth/LOGIN_SUCCESS_REDIRECT';
const LOGIN_FAIL = 'around/auth/LOGIN_FAIL';
const LOGOUT = 'around/auth/LOGOUT';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      // TODO throw cookie out
      const data = cookie.load('aroundSlo');
      return {
        ...state,
        loggingIn: false,
        user: data.user,
        token: data.token
      };
    case LOGIN_SUCCESS_REDIRECT:
      return {
        ...state,
        loggingIn: false,
        userId: action.data.userId,
        token: action.data.token
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
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
  return globalState.auth.userId;
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

export function logout() {
  return {
    type: LOGOUT
  };
}
