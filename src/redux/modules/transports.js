const LOAD_ONE = 'around/transport/LOAD';
const LOAD_ONE_SUCCESS = 'around/transport/LOAD_SUCCESS';
const LOAD_ONE_FAIL = 'around/transport/LOAD_FAIL';
const LOAD = 'around/transports/LOAD';
const LOAD_SUCCESS = 'around/transports/LOAD_SUCCESS';
const LOAD_FAIL = 'around/transports/LOAD_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {},
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ONE:
      return {
        ...state,
        loading: true
      };
    case LOAD_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.result],
        error: null
      };
    case LOAD_ONE_FAIL:
      return {
        ...state,
        loading: false,
        data: state.data,
        error: action.error
      };
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

export function isOneLoaded(globalState) {
  return globalState.transports.data.find(transport => {
    if (transport.idTransport === globalState.router.params.transportId) {
      return transport;
    }
    return false;
  });
}

export function loadOne(globalState) {
  const transportId = globalState.router.params.transportId;
  return {
    types: [LOAD_ONE, LOAD_ONE_SUCCESS, LOAD_ONE_FAIL],
    promise: (client) => client.get(`/transports/${transportId}`)
  };
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
