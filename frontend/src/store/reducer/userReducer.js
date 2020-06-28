const initialState = {
  id: null,
  username: null,
  email: null,
  password: null,
  auth: false,
  adminer: false,
}

export default function user(state = {...initialState}, action) {
  switch(action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        ...action.payload,
        auth: true,
      };

    case 'USER_AUTH':
      return {
        ...state,
        auth: !state.auth,
      };

    case 'CLEAR_USER':
      return {
        ...initialState
      };

      default:
        return state;
  }
}