'use strict'

const OrderAttributes = require('../../models').OrderAttribute;

const getAllByOrderId = async orderId => {
  let attributes = await OrderAttributes.findAll({
    where: {
      orderId
    }
  });
  return attributes.map(attr => attr.dataValues);
}

const create = async body => {
  await OrderAttributes.create(body);
}

const update = async (id, body) => {
  await OrderAttributes.update(
    body,
    {
      where: {
        id
      }
    }
  );
}

module.exports = {
  getAllByOrderId,
  create,
  update
}

