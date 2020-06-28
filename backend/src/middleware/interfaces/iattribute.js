'use strict'

const attributesQueries = require('../dbqueries/attribute');

const errors = require('../../errors');

const getAttributesByTimetableId = async timetableId => {
  return await attributesQueries.getByTimetableId(timetableId);
}

const createAttribute = async body => {
  validateCreateBody(body);
  await attributesQueries.create(body);
}

const validateCreateBody = body => {
  body = Object.keys(body);
  console.log(body);
  if (
    body.length !== 4 ||
    !body.includes('timetableId') ||
    !body.includes('name') ||
    !body.includes('required') ||
    !body.includes('type')
  ) {
    throw new Error(errors.wrongBody);
  }
}

module.exports = {
  getAttributesByTimetableId,
  createAttribute
}