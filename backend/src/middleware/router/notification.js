'use strict'

const Router = require('koa-router');

const notificationInterface = require('../interfaces/inotification');

const router = new Router();

router

  .put('/notifications/:id', async (ctx, next) => {
    await notificationInterface
      .updateNotification(ctx.params.id, ctx.request.body);

    ctx.response.body = {message: 'ok'};
  });

module.exports = router;