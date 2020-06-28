export default function asyncReducer(state = {}, action) {
  switch(action.type) {
    case 'TIMETABLES_LOADING':
      return {
        ...state,
        loadingTimetables: !state.loadingTimetables
      };
    case 'ORDER_CREATING':
      return {
        ...state,
        creatingOrder: !state.creatingOrder
      }
    default:
      return state;
  }
}