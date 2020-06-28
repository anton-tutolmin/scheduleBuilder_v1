const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
  },
  isLoadUser: true,
  orders: [],
  isLoadOrders: true
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case 'LOAD_USER_INFO':
      return {
        ...state,
        user: action.payload,
        isLoadUser: false
      };

    case 'RELOAD_USER_INFO':
      return {
        ...state,
        isLoadUser: true
      };
    
    case 'LOAD_USER_ORDER':
      return {
        ...state,
        orders: action.payload,
        isLoadOrders: false
      };

    case 'RELOAD_USER_ORDERS':
      return {
        ...state,
        isLoadOrders: true
      }

    case 'CLEAR_USER_INFO':
      return {
        ...initialState
      };

    default:
      return state;
  }
}