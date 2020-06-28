'use strict'

const orderQueries = require('../dbqueries/order');
const timetableInterface = require('./itimetables');
const userInterface = require('./iuser');
const orderAttributeInterface = require('./iorderAttribute');
const Op = require('sequelize').Op;

const errors = require('../../errors');

const getOrderByUrlParam = async url => {
  let params = parseUrlParam(url, Op);

  let orders = await orderQueries.getAllByParams(params);

  for (let order of orders) {

    let timetable = await timetableInterface
      .getTimetableById(order.timetableId);

    order.row =
      new Date(order.periodstart).getHours() -
      new Date(timetable.periodStart).getHours() + 1;

    order.column =
      Math.floor(
        ((new Date(order.periodstart) -
        new Date(timetable.periodStart)) /
        (60 * 60 * 24 * 1000)) + 1
      );

    order.timetableName = timetable.name;

    let author =
      await userInterface.getById(order.authorId);

    order.authorName = author.username;

    order.attributes =
      await orderAttributeInterface.getByOrderId(order.id);

  }
  return orders;
}

const getOrderById = async id => {
  let order = await orderQueries.getById(id);

  let author =
    await userInterface
      .getById(order.authorId);

  let timetable =
    await timetableInterface
      .getTimetableById(order.timetableId);

  order.authorName = author.username;

  order.timetableName = timetable.name;

  order.attributes =
    await orderAttributeInterface.getByOrderId(order.id);

  return order;
}

const getByAuthorId = async id => {
  let orders = await orderQueries.getByAuthorId(id);

  for (let order of orders) {

    let timetable =
      await timetableInterface
        .getTimetableById(order.timetableId);

    let author =
      await userInterface.getById(order.authorId);

    let attributes =
      await orderAttributeInterface.getByOrderId(order.id);

    order.timetableName = timetable.name;
    order.authorName = author.username;
    order.attributes = attributes;

  }

  return orders;
}

const createOrder = async body => {
  validateCreateBody(body);

  let conflicts = await orderQueries.getAllByParams({
    authorId: body.authorId,
    timetableId: body.timetableId,
    periodstart: body.periodstart,
  });

  if (conflicts.length === 0) {

    let order = await orderQueries.create({
      authorId: body.authorId,
      timetableId: body.timetableId,
      periodstart: body.periodstart,
      periodstop: body.periodstop,
      status: body.status
    });

    await orderAttributeInterface
      .createAttribute(order.id, body.attribute);

  } else {
    throw new Error(errors.userHasOrderAlready);
  }
}

const updateOrderById = async (id, body, isAdminer) => {
  validateUpdateBody(body);

  if (body.status !== 'canceled' && !isAdminer) {
    throw new Error(errors.noAdminerRights);
  }

  if (body.status === 'confirmed' && isAdminer) {

    let order = await orderQueries.getById(id);
    
    let conflicts = await orderQueries.getAllByParams({
      id: {
        [Op.not]: id
      },
      timetableId: order.timetableId,
      periodstart: order.periodstart
    });

    for (let conflict of conflicts) {
      await orderQueries.update(conflict.id, {status: 'canceled'});
    }

  }


 await orderQueries.update(id, body);
}

const parseUrlParam = (url, Op) => {
    const params = {};

    const paramsArr = url.split('?')[1].split('&')
      .map(param => param.split('='));
      
    for (let param of paramsArr) {

      switch(param[0]) {
        case 'ordersIds': params.ordersId = {
          [Op.in]: param[1].split(',')
        }; break;
        case 'authorId': params.authorId = {
          [Op.in]: param[1].split(',')
        }; break;
        case 'periodstart': params.periodstart = new Date(param[1]); break;
        case 'periodstop': params.periodstop = new Date(param[1]); break;
        case 'timetablesId': params.timetableId = {
          [Op.in]: param[1].split(',').map(id => +id)
        }; break; 
      }
  
    }
    return params;
  }

const validateCreateBody = body => {
  body = Object.keys(body);
  if (
    body.length !== 6 ||
    !body.includes('authorId') ||
    !body.includes('timetableId') ||
    !body.includes('periodstart') ||
    !body.includes('periodstop') ||
    !body.includes('attribute') ||
    !body.includes('status')
    ) {
      throw new Error(errors.wrongBody);
    }
}

const validateUpdateBody = (body) => {
  body = Object.keys(body)
  if (
    body.length === 1 &&
    body[0] !== 'status' &&
    (body.status !== 'created' &&
    body.status !== 'confirmed' &&
    body.status !== 'canceled' &&
    body.status !== 'closed')
  ) {
    throw new Error(errors.wrongBody);
  }
}

module.exports = {
  getOrderByUrlParam,
  getOrderById,
  getByAuthorId,
  createOrder,
  updateOrderById
}