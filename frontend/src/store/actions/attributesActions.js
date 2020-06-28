import { bindActionCreators } from 'redux'
import axios from 'axios';

import store from '../index';

import { addNotification } from './notificationActions';
import ordersActions from './ordersActions';

function doUpdateAttribute(id, body) {
  return dispatch => {
    axios.put(`/attributeorders/${id}`, body)
      .then(res => {
        console.log(res.data);
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          ordersActions.reloadOrderInfo();
          dispatch(addNotification('Attribute updated'));
        }
      });
  }
}

export default bindActionCreators(
  {
    update: doUpdateAttribute,
  },
  store.dispatch
);

