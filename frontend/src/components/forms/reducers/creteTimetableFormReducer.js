export const initialState = {
  name: '',
  numberColumn: '',
  numberRow: '',
  periodStart: '',
  periodStop: '',
  attributes: [],
};

export const params = [
  {name: 'name', actionType: 'SET_NAME'},
  {name: 'number column', actionType: 'SET_COLUMN'},
  {name: 'number row', actionType: 'SET_ROW'},
  {name: 'period start', actionType: 'SET_START'},
  {name: 'period stop', actionType: 'SET_STOP'}
];

export function reducer(state, action) {
    switch(action.type) {
      case 'SET_NAME':
        return {
          ...state,
          name: action.payload
        };
      case 'SET_COLUMN':
        return {
          ...state,
          numberColumn: action.payload
        };
      case 'SET_ROW':
        return {
          ...state,
          numberRow: action.payload
        };
      case 'SET_START':
        return {
          ...state,
          periodStart: action.payload
        }
      case 'SET_STOP':
        return {
          ...state,
          periodStop: action.payload
        }
      case 'TOGGLE_ATTRIBUTE':
        return {
          ...state,
          visibleAttributeForm: !state.visibleAttributeForm
        }
      case 'ADD_ATTRIBUTE':
        return {
          ...state,
          attributes: state.attributes.concat(action.payload)
        }
      case 'REMOVE_ATTRIBUTE':
        return {
          ...state,
          attributes: state.attributes
            .filter(attr => attr.name !== action.payload)
        };
      default:
        return state;
    }
  }