'use strict'

const Sessions = require('../../models').session;

const create = async (userId) => {
  let session = await Sessions.create({
    userId
  });
  return session.dataValues;
}

const remove = async (id) => {
  await Sessions.destroy({
    where: {
      id
    },
    truncate:true
  });
}

const getSessionById = async (sessionId) => {
  let session = await Sessions.findOne({
    where: {
      id: sessionId
    }
  });
  return session.dataValues;
}

module.exports = {
  create,
  remove,
  getSessionById
}