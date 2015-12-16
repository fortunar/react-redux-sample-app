/**
 * Created by rokfortuna on 12/15/15.
 */
const LOAD = 'around/user/LOAD';
const LOAD_SUCCESS = 'around/user/LOAD_SUCCESS';
const LOAD_FAIL = 'around/user/LOAD_FAIL';
const LOGOUT = 'around/user/LOGOUT';

export default function reducer(state = {loaded: false}, action = {}) {
  switch (action.type) {
    case LOAD:
      console.log('USER INFO LOADING');
      return {
        ...state
      };
    case LOAD_SUCCESS:
      console.log('USER INFO SUCCESS');
//      console.log(action.result);
      return {
        ...state,
        loaded: true,
        name: action.result.name,
        surname: action.result.surname,
        email: action.result.email
        // TODO add more data if needed
      };
    case LOAD_FAIL:
      console.log('USER INFO FAIL');
      return {
        ...state,
        loaded: false
      };
    case LOGOUT:
      console.log('USER LOGOUT');
      return {
        ...state,
        loaded: false,
        name: null,
        surname: null,
        email: null
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.user.loaded;
}

export function load(userId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/users/${userId}`) // params not used, just shown as demonstration
  };
}

export function logout() {
  return {
    types: LOGOUT
  };
}

