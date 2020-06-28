'use strict'

const Attributes = require('../../models').attribute

const getByTimetableId = async timetableId => {
  let attributes = await Attributes.findAll({
    where: {
      timetableId
    }
  });
  return attributes.map(attr => attr.dataValues);
}

const create = async body => {
  await Attributes.create(body);
}

module.exports = {
  getByTimetableId,
  create
}