import axios from 'axios';
import { bindActionCreators } from 'redux';
import store from '../index';

import { addNotification } from './notificationActions';
import { showLoading, hideLoading } from './loadingAction';

const loadTimetablesAll = payload => ({ type: 'TIMETABLE_LOADED', payload });

const reloadTimetable = () => ({ type: 'RELOAD_TIMETABLE' });


function doTimetablesLoad() {
  return dispatch => {
    dispatch(showLoading());
    axios.get('/timetables')
      .then(res => {
        console.log(res.data);
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(loadTimetablesAll(res.data.timetables));
        }
      });
  }
}

function doTimetableCreate(timetable) {
  return dispatch => {
    dispatch(showLoading());
    axios.post('/timetables', timetable)
      .then(res => {
        console.log(res.data);
        dispatch(hideLoading());
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(addNotification('Timetable created'));
          dispatch(reloadTimetable());
        }
      });
  }
}

function doTimetableUpdate(id, body) {
  return dispatch => {
    dispatch(showLoading());
    axios.put(`/timetables/${id}`)
      .then(res => {
        dispatch(hideLoading());
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(addNotification('Timetable updated'));
          dispatch(reloadTimetable());
        }
      });
  }
}

function doTimetableDelete(id) {
  return dispatch => {
    dispatch(showLoading());
    axios.delete(`/timetables/${id}`)
      .then(res => {
        dispatch(hideLoading());
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(addNotification('Timetable deleted'));
          dispatch(reloadTimetable());
        }
      });
  }
}

export default bindActionCreators(
  {
    loadAll: doTimetablesLoad,
    create: doTimetableCreate,
    update: doTimetableUpdate,
    delete: doTimetableDelete,
  },
  store.dispatch
);