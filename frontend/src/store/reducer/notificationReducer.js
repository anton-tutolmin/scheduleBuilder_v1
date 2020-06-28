const initialState = {
  isLoad: true,
  notifications: []
}


export default function notificationReducer(state, action) {
  switch(action.type) {
    case 'LOAD_NOTIFICATION': 
      return {
        ...state,
        notifications: action.payload,
        isLoad: false
      };
    case 'RELOAD_NOTIFICATION':
      return {
        ...state,
        isLoad: true,
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notifications: [],
        isLoad: true
      };
    default:
      return state;
  }
}