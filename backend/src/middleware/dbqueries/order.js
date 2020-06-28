'use strict'

const Orders = require('../../models').order;

const getAllByParams = async (params) => {
  let orders = await Orders.findAll({
    where: {
      ...params
    }
  });
  return orders.map(order => order.dataValues);
}

const getById = async id => {
  let order = await Orders.findOne({
    where: {
      id
    }
  });
  return order.dataValues;
}

const getByAuthorId = async authorId => {
  let orders = await Orders.findAll({
    where: {
      authorId
    }
  });
  return orders.map(order => order.dataValues);
}

const create = async body => {
  return await Orders.create(body);
}

const update = async (id, status) => {
  await Orders.update(
    {
      ...status
    },
    {
      where: {
        id
      }
    }
  );
}

module.exports = {
  getAllByParams,
  getById,
  getByAuthorId,
  create,
  update
}