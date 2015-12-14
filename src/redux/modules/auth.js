import cookie from 'react-cookie';

const LOGIN = 'around/auth/LOGIN';
const LOGIN_SUCCESS = 'around/auth/LOGIN_SUCCESS';
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
      const data = cookie.load('aroundSlo');
      return {
        ...state,
        loggingIn: false,
        user: data.user,
        token: data.token
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      cookie.remove('aroundSlo');
      return {
        ...state,
        user: null,
        token: null
      };
    default:
      return state;
  }
}

export function isLogedIn(globalState) {
  return globalState.auth.user;
}

export function updateUserData() {
  return {
    type: LOGIN_SUCCESS
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
