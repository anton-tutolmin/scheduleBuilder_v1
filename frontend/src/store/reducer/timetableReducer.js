const initialState = {
  timetables: [],
  isLoad: true
}

export default function timetable(state = initialState, action) {
  switch (action.type) {
    case 'TIMETABLE_LOADED':
      return {
        ...state,
        timetables: action.payload,
        isLoad: false
      };

    case 'RELOAD_TIMETABLE':
      return {
        ...state,
        isLoad: true
      }

    default:
      return state;
  }
}