import { combineReducers } from 'redux';
import timetablesReducer from './timetableReducer';
import usersReducer from './userReducer';
import ordersReducer from './orderReducer';
import asyncReducer from './asyncReducer';
import usersListReducer from './userListReducer';
import orderInfoReducer from './orderInfoReducer';
import userInfoReducer from './userInfoReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
  timetablesReducer,
  usersReducer,
  usersListReducer,
  ordersReducer,
  asyncReducer,
  orderInfoReducer,
  userInfoReducer,
  notificationReducer
});