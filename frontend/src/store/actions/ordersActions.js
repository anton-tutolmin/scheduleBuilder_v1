import axios from 'axios';
import { bindActionCreators } from 'redux';
import store from '../index';

import { showLoading, hideLoading } from './loadingAction';
import { addNotification } from './notificationActions';

const loadOrder = orders => ({ type: 'LOAD_ORDER', payload: orders });

const loadOrderInfo = payload => ({ type: 'LOAD_ORDER_INFO', payload });

const loadUserOrder = payload => ({ type: 'LOAD_USER_ORDER', payload });

const reloadOrder = () => ({ type: 'RELOAD_ORDER' });

const clearOrder = () => ({ type: 'CLEAR_ORDER' });

const clearOrderInfo = () => ({ type: 'CLEAR_ORDER_INFO' });

const reloadOrderInfo = () => ({ type: 'RELOAD_ORDER_INFO' });

function doOrderParamsLoad(params) {
  return dispatch => {
    dispatch(showLoading());
    axios.get(`/orders?${params}`)
      .then(res => {
        console.log(res.data);
        dispatch(hideLoading);
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(loadOrder(res.data.orders));
        }
      });
  }
}

function doOrderLoadById(id) {
  return dispatch => {
    axios.get(`/orders/${id}`)
      .then(res => {
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(loadOrderInfo(res.data.order));
        }
      })
  }
}

function doLoadByAuthorId(id) {
  console.log(id);
  return dispatch => {
    axios.get(`/users/${id}/orders`)
      .then(res => {
        console.log(res.data);
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(loadUserOrder(res.data.orders));
        }
      });
  }
}

function doOrderCreate(order) {
  return dispatch => {
    dispatch(showLoading());
    axios.post('/orders', order)
      .then(res => {
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(addNotification('Order created'));
          dispatch(reloadOrder());
        }
      });
  }
}

function doOrderUpdate(id, body) {
  return dispatch => {
    dispatch(showLoading());
    axios.put(`/orders/${id}`, body)
      .then(res => {
        dispatch(hideLoading());
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(addNotification('Order updated'));
          dispatch(reloadOrder());
        }
      });
  }
}

function doOrderDelete(id) {
  return dispatch => {
    dispatch(showLoading);
    axios.delete(`/orders/${id}`)
      .then(res => {
        dispatch(hideLoading());
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(addNotification('Order deleted'));
          dispatch(reloadOrder());
        }
      });
  }
}

function doOrderClear() {
  return dispatch => {
    dispatch(clearOrder());
  }
}

function doClearOrderInfo() {
  return dispatch => {
    dispatch(clearOrderInfo());
  }
}

function doReloadOrderInfo() {
  return dispatch => {
    dispatch(reloadOrderInfo());
  }
}

export default bindActionCreators(
  {
    loadByParams: doOrderParamsLoad,
    loadById: doOrderLoadById,
    loadByAuthorId: doLoadByAuthorId,
    create: doOrderCreate,
    update: doOrderUpdate,
    delete: doOrderDelete,
    clear: doOrderClear,
    clearOrderInfo: doClearOrderInfo,
    reloadOrders: reloadOrder,
    reloadOrderInfo: doReloadOrderInfo
  },
  store.dispatch
);