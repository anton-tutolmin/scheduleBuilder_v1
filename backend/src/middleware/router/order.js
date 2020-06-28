'use strict';

const Router = require('koa-router');

const orderInterface = require('../interfaces/iorder');

const router = new Router();

router
  .get('/orders', async (ctx, next) => {
    let orders =
      await orderInterface
        .getOrderByUrlParam(ctx.request.url);

    ctx.response.body = {orders};
  })

  .post('/orders', async (ctx, next) => {
    await orderInterface.createOrder(ctx.request.body);
    ctx.response.body = {message: 'ok'};
  })

  .get('/orders/:id', async (ctx, next) => {
    let order = await orderInterface
      .getOrderById(ctx.params.id);
      
    ctx.response.body = {order};
  })

  .put('/orders/:id', async (ctx, next) => {
    await orderInterface
      .updateOrderById(
        ctx.params.id,
        ctx.request.body,
        ctx.session.adminer
      );

    ctx.response.body = {message: 'ok'};
  });

module.exports = router;
