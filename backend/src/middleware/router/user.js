'use strict';

const Router = require('koa-router');

const passport = require('../passport/passport');

const userInterface = require('../interfaces/iuser');

const orderInterface = require('../interfaces/iorder');

const router = new Router();

router
  .get('/users', async (ctx, next) => {
    let users = await userInterface.getAllUsers();
    ctx.response.body = {users};
  })

  .get('/users/profile', async (ctx, next) => {
    if (!ctx.session.id) {
      throw new Error('not auth');
    } else {
      let user = await userInterface.profile(ctx.session.id);
      if (user.adminer) ctx.session.adminer = true;
      ctx.response.body = {user};
    }
  })

  .post('/users/login', async (ctx, next) => {
    await passport.authenticate('local', async (err, user, message) => {
      if (err) {
        throw new Error(message);
      }

      let session = await userInterface.login(user.dataValues.id);

      ctx.session.id = session.id;

    })(ctx, next);
    ctx.response.body = {message: 'ok'};
  })

  .delete('/users/logout', async (ctx, next) => {
    await userInterface.logout(+ctx.session.id);
    ctx.session.id = null;
    ctx.response.body = {message: 'ok'};
  })

  .post('/users/register', async (ctx, next) => {
    let session = await userInterface.registration(ctx.request.body);
    ctx.session.id = session.id;
    ctx.response.body = {message: 'ok'};
  })

  .get('/users/:id', async (ctx, next) => {
    let user = await userInterface.getById(+ctx.params.id);
    ctx.response.body = {user};
  })

  .put('/users/:id', async (ctx, next) => {
    await userInterface.updateById(+ctx.params.id, ctx.request.body);
    ctx.response.body = {message: 'ok'}
  })

  .delete('/users/:id', async (ctx, next) => {
    await userInterface.deleteById(+ctx.params.id);
    ctx.response.body = {message: 'ok'};
  })

  .get('/users/:id/orders', async (ctx, next) => {
    let orders = await orderInterface.getByAuthorId(+ctx.params.id);
    console.log(orders);
    ctx.response.body = {orders};
  })

  .get('/users/:id/notification', async (ctx, next) => {
    let notifications =
      await userInterface.getNotificationByUserId(+ctx.params.id);
    ctx.response.body = {notifications};
  });

module.exports = router;
