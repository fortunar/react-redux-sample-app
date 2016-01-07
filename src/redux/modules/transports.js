/**
 * Created by rokfortuna on 1/4/16.
 */

const LOAD = 'around/transports/LOAD';
const LOAD_SUCCESS = 'around/transports/LOAD_SUCCESS';
const LOAD_FAIL = 'around/transports/LOAD_FAIL';

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
  return globalState.transports && globalState.transports.loaded;
}

// put globalState as parameters
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/transports', {})
  };
}
