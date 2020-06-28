import { bindActionCreators } from 'redux';
import store from '../index';

const notifications = [
  {id: 1, message: 'Order confirmed', order: {timetableName: 'Baikal schedule', periodStart: new Date('Jun 22 2020 10:00:00')}},
  {id: 2, message: 'Order created', order: {timetableName: 'School schedule', periodStart: new Date('Jun 28 2020 12:00:00')}},
  {id: 3, message: 'Order canceled', order: {timetableName: 'School schedule', periodStart: new Date('Jun 25 2020 15:00:00')}}
];

const load = payload => ({ type: 'LOAD_NOTIFICATION', payload });
const reload = () => ({ type: 'RELOAD_NOTIFICATION' });
const clear = () => ({ type: 'CLEAR_NOTIFICATION' });

const doNotificationLoad = () => {
  return dispatch => {
    dispatch(load(notification));
  }
}

const doNotificationRemove = (id) => {
  notification = notifications.filter(n => n.id !== id);
  return dispatch => {

  }
}

export default bindActionCreators(
  {
    load: doNotificationLoad,
    remove: doNotificationRemove,
  },
  store.dispatch
);


