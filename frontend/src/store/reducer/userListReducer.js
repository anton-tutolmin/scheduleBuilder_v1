const initialState = {
  users: [],
  isLoad: true
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case 'LOAD_USER_LIST':
      return {
        ...state,
        users: action.payload,
        isLoad: false
      };

    case 'RELOAD_USER_LIST':
      return {
        ...state,
        isLoad: true
      };

    case 'CLEAR_USER_LIST':
      return {
        users: [],
        isLoad: true
      };

    default:
      return state;
  }
}