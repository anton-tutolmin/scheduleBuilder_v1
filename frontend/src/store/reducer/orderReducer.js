const initialState = {
  orders: [],
  isLoad: true
}

export default function reducer(state=initialState, action) {
  switch(action.type) {

    case 'LOAD_ORDER':
      return {
        ...state,
        orders: action.payload,
        isLoad: false
      };

    case 'RELOAD_ORDER':
      return {
        ...state,
        isLoad: true
      }

    case 'CLEAR_ORDER':
      return {
        orders: [],
        isLoad: true
      }

    default:
      return state;
  }
}