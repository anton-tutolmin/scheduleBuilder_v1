'use strict'

const Users = require('../../models').user;

const getAll = async () => {
  let users = await Users.findAll();
  return users.map(user => user.dataValues);
}

const create = async body => {
  let user = await Users.create({
    ...body
  });
  return user.dataValues;
}

const getByName = async username => {
  let user = await Users.findOne({
    where: {
      username
    }
  });
  return user.dataValues;
}

const getById = async id => {
  let user = await Users.findOne({
    where: {
      id
    }
  });
  return user.dataValues;
}

const remove = async id => {
  await Users.destroy({
    where: {
      id
    }
  });
}

const update = async (id, body) => {
  await Users.update(
    {
      ...body
    },
    {
      where: {
        id
      }
    });
}

module.exports = {
  getAll,
  create,
  getById,
  getByName,
  remove,
  update,
}

