const LOAD_ONE = 'around/transport/LOAD';
const LOAD_ONE_SUCCESS = 'around/transport/LOAD_SUCCESS';
const LOAD_ONE_FAIL = 'around/transport/LOAD_FAIL';

const initialState = {
  loading: false,
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
      console.log("SUCCESS");
      console.log(action);
      return {
        ...state,
        loading: false,
        data: [...state.data, action.result],
        error: null
      };
    case LOAD_ONE_FAIL:
      console.log("ERROR");
      return {
        ...state,
        loading: false,
        data: state.data,
        error: action.error
      };
    default:
      return state;
  }
}

export function isOneLoaded(globalState) {
  return globalState.transports.data.find(t => {
    if(t.idTransport == globalState.router.params.transportId) {
      return t;
    } else {
      return false;
    }
  })
}

export function loadOne(globalState) {
  const transportId = globalState.router.params.transportId;
  return {
    types: [LOAD_ONE, LOAD_ONE_SUCCESS, LOAD_ONE_FAIL],
    promise: (client) => client.get(`/transports/${transportId}`)
  };
}

