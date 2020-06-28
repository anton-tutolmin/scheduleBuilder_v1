'use strict'

const orderAttributeQueries = require('../dbqueries/orderAttribute');

const errors = require('../../errors');

const getByOrderId = async orderId => {
  return orderAttributeQueries.getAllByOrderId(orderId);
};

const createAttribute = async (orderId, attributes) => {
  for (let attributeName of Object.keys(attributes)) {

    await orderAttributeQueries.create({
      name: attributeName,
      value: attributes[attributeName],
      orderId
    });

  }
};

const updateById = async (id, body) => {
  validateUpdateBody(body);
  await orderAttributeQueries.update(id, body);
}

const validateUpdateBody = body => {
  body = Object.keys(body);
  if (
    body.length !== 1 ||
    !body.includes('value')
  ) {
    throw new Error(errors.wrongBody);
  }
}

module.exports = {
  getByOrderId,
  createAttribute,
  updateById
}