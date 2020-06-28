'use strict'

const notificationQueries = require('../dbqueries/notification');
const errors = require('../../errors');

const updateNotification = async (id, body) => {
  validateUpdateBody(body);
  await notificationQueries.update(body);
}

const validateUpdateBody = body => {
  body = Object.keys(body);
  if (
      body.length !== 1 ||
      !body.includes('status') ||
      (body['status'] !== 'read' &&
      body['status'] !== 'unread')
    ) {
    throw new Error(errors.wrongBody);
  }
}

module.exports = {
  updateNotification
}