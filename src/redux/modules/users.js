const LOAD = 'around/users/LOAD';
const LOAD_SUCCESS = 'around/users/LOAD_SUCCESS';
const LOAD_FAIL = 'around/users/LOAD_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        data: [],
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:

      return {
        ...state,
        loading: false,
        loaded: false,
        data: [],
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.users && globalState.users.loaded;
}

export function load(globalState) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/users', {token: globalState.auth.login.token}) // params not used, just shown as demonstration
  };
}

