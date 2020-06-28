export const initialState = {
  username: '',
  password: '',
  email: '',
}

export const params = [
  {name: 'username', actionType: 'SET_USERNAME'},
  {name: 'password', actionType: 'SET_PASSWORD'},
  {name: 'email', actionType: 'SET_EMAIL'}
];

export function reducer(state, action) {
  switch(action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload
      };
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.payload
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload
      }
    default:
      return state;
  }
}