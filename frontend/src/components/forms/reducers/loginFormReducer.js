export const initialState = {
  username: '',
  password: ''
}

export const params = [
  {name: 'username', actionType: 'SET_USERNAME'},
  {name: 'password', actionType: 'SET_PASSWORD'}
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
    default:
      return state;
  }
}