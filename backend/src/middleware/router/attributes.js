const Router = require('koa-router');

const attributeInterface = require('../interfaces/iorderAttribute');

const router = new Router();

router
  .get('/attributesOrder', async (ctx, next) => {
    //TODO
  })

  .post('/attributesOrder', async (ctx, next) => {
    //TODO
  })

  .put('/attributeorders/:id', async (ctx, next) => {
    await attributeInterface
      .updateById(ctx.params.id, ctx.request.body);
    ctx.response.body = {message: 'ok'};
  })

  .delete('/attributesOrders/:id', async (ctx, next) => {
    //TODO
  })

module.exports = router;