import axios from 'axios';

import timetablesActions from '../store/actions/timetablesActions';
import ordersActions from '../store/actions/ordersActions';
import attributesActions from '../store/actions/attributesActions';
import usersActions from '../store/actions/usersActions';

const auth = {

  login: body => {
    usersActions.login(body);
  },

  logout: () => {
    usersActions.logout();
  },

  register: body => {
    usersActions.register(body);
  },

  profile: () => {
    usersActions.load();
  }
    
};

const users = {
  delete: id => {
    usersActions.delete(id);
  },

  update: (id, body) => {
    usersActions.update(id, body);
  },

  getAll: () => {
    usersActions.loadAll();
  },

  getById: id => {
    return usersActions.loadById(id);
  }
};

const timetables = {
  getAll: () => {
    timetablesActions.loadAll();
  },

  getById: id => {
    return axios.get(`/timetables/${id}`);
  },

  create: body => {
    delete body.visibleAttributeForm;
    body.periodStart = new Date(body.periodStart);
    body.periodStop = new Date(body.periodStop);
    timetablesActions.create(body);
  },

  update: (id, body) => {
    timetablesActions.update(id, body);
  },

  delete: id => {
    timetablesActions.delete(id);
  }  
};

const orders = {
  getAll: params => {
    ordersActions.loadByParams(params);
  },

  getById: id => {
    ordersActions.loadById(id);
  },

  getConflicts: params => {
    ordersActions.loadConflicts(params);
  },

  getByAuthorId: id => {
    ordersActions.loadByAuthorId(id);
  },

  create: body => {
    ordersActions.create(body);
  },

  update: (id, body) => {
    ordersActions.update(id, body);
  },

  delete: id => {
    ordersActions.delete(id);
  }
}

const attributes = {
  update: (id, body) => {
    attributesActions.update(id, body);
  }
}

const notification = {
  load: id => {
    notificationAction.load(id);
  }
}

export default {
  auth,
  users,
  timetables,
  orders,
  attributes
};