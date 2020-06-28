import axios from 'axios';
import { bindActionCreators } from 'redux';
import store from '..';
import { showLoading, hideLoading } from './loadingAction';
import { addNotification } from './notificationActions';

const loadUser = payload => ({ type: 'USER_LOADED', payload });

const loadUsersAll = payload => ({ type: 'LOAD_USER_LIST', payload });

const toggleAuth = () => ({ type: 'USER_AUTH' });

const clearUser = () => ({ type: 'CLEAR_USER' });

const reloadUserList = () => ({ type: 'RELOAD_USER_LIST' });

const clearUserList = () => ({ type: 'CLEAR_USER_LIST ' });

const loadUserById = payload => ({ type: 'LOAD_USER_INFO', payload });

const clearUserInfo = () => ({ type: 'CLEAR_USER_INFO' });


function doUserLogin(user) {
  console.log('action login');
  return dispatch => {
    dispatch(showLoading());
    axios.post(`/users/login`, user)
      .then(res => {
        dispatch(hideLoading());
        if (res.data.error) {
          console.log(res.data.error);
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(toggleAuth());
        }
      });
  }
}

function doUserRegister(user) {
  console.log('action register');
  return dispatch => {
    dispatch(showLoading());
    axios.post('/users/register', user)
      .then(res => {
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(toggleAuth());
        }
      });
  }
}

function doUserLoad() {
  console.log('action load');
  return dispatch => {
    axios.get('/users/profile')
      .then(res => {
        if (!res.data.error) {
          dispatch(loadUser(res.data.user));
        } else {
          dispatch(toggleAuth());
        }
      });
  }
}

function doUserLoadById(id) {
  return dispatch => {
    axios.get(`/users/${id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(loadUserById(res.data.user));
        }
      });
  }
}

function doUserLogout() {
  console.log('action logout');
  return dispatch => {
    axios.delete('/users/logout')
      .then(res => {
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(clearUser());
        }
      });
  }
}

function doUserDelete(id) {
  console.log('action delete');
  return dispatch => {
    dispatch(showLoading());
    axios.delete(`/users/${id}`)
      .then(res => {
        dispatch(hideLoading());
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(addNotification('User deleted'));
          dispatch(reloadUserList());
        }
      });
  }
}

function doUserUpdate(id, body) {
  console.log('action update');
  return dispatch => {
    dispatch(showLoading());
    axios.put(`/users/${id}`, body)
      .then(res => {
        dispatch(hideLoading());
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(addNotification('User updated'));
          dispatch(toggleAuth());
        }
      });
  }
}

function doUsersAllLoad() {
  console.log('action loadAll');
  return dispatch => {
    dispatch(showLoading());
    axios.get('/users')
      .then(res => {
        dispatch(hideLoading());
        if (res.data.error) {
          dispatch(addNotification(res.data.error));
        } else {
          dispatch(loadUsersAll(res.data.users));
        }
      });
  }
}

function doClearUserList() {
  return dispatch => {
    dispatch(clearUserList());
  };
}

function doClearUserInfo() {
  return dispatch => {
    dispatch(clearUserInfo());
  }
}

export default bindActionCreators(
  {
    login: doUserLogin,
    register: doUserRegister,
    load: doUserLoad,
    loadById: doUserLoadById,
    logout: doUserLogout,
    delete: doUserDelete,
    update: doUserUpdate,
    loadAll: doUsersAllLoad,
    clearUserList: doClearUserList,
    clearUserInfo: doClearUserInfo
  },
  store.dispatch
);
