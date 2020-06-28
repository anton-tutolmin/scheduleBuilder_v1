const initialState = {
  order: {
    id: null,
    timetableName: null,
    authorName: null,
    periodstart: null,
    periodstop: null,
    attributes: []
  },
  isLoad: true
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'LOAD_ORDER_INFO':
      return {
        order: action.payload,
        isLoad: false
      };
    
    case 'CLEAR_ORDER_INFO':
      return {
        order: initialState.order,
        isLoad: true
      };

    case 'RELOAD_ORDER_INFO':
      return {
        ...state,
        isLoad: true
      };
    
    default:
      return state;
  };
}