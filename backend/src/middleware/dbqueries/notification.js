'use strict'

const Notifications = require('../../models').notification;

const update = async (id, body) => {
  await Notifications.update(
    body,
    {
      where: {
        id
      }
    }
  );
}

module.exports = {
  update
}