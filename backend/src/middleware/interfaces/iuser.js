const userQueries = require('../dbqueries/user');
const sessionQueries = require('../dbqueries/session');

const errors = require('../../errors');

const registration = async body => {
  validateRegisterBody(body);
  let user = await userQueries.create(body);
  return await sessionQueries.create(user.id);
}

const login = async id => {
  return await sessionQueries.create(id);
}

const logout = async id => {
  await sessionQueries.remove(id);
}

const profile = async sessionId => {
  let session = await sessionQueries.getSessionById(sessionId);
  let user = await userQueries.getById(session.userId);

  if (user.username === 'adminer') user.adminer = true;

  return user;
}

const getAllUsers = async () => {
  return await userQueries.getAll();
}

const getById = async id => {
  let user = await userQueries.getById(id);
  return user;
}

const updateById = async (id, body) => {
  validateUpdateBody(body);
  await await userQueries.update(id, body);
}

const deleteById = async id => {
  await userQueries.remove(id);
}

const validateUpdateBody = body => {
  if (Object.keys(body).every(param =>
    param !== 'username' &&
    param !== 'email' &&
    param !== 'password'
    )) {
    throw new Error(errors.wrongBody);
  }
};

const validateLoginBody = body => {
  body = Object.keys(body);
  if (
    body.length !== 2 ||
    !body.includes('username') ||
    !body.includes('password')
  ) {
    throw new Error(errors.wrongBody);
  }
};

const validateRegisterBody = body => {
  body = Object.keys(body);
  if (
    body.length !== 3 ||
    !body.includes('username') ||
    !body.includes('email') ||
    !body.includes('password')
  ) {
    throw new Error(errors.wrongBody);
  }
};

module.exports = {
  registration,
  login,
  logout,
  profile,
  getAllUsers,
  getById,
  updateById,
  deleteById
};