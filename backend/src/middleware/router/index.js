'use strict';

const Router = require('koa-router');

const userRouter = require('./user');
const timetableRouter = require('./timetable');
const orderRouter = require('./order');
const notificationRouter = require('./notification');
const attributesRouter = require('./attributes');

const router = new Router();

router.use(
  userRouter.routes(),
  orderRouter.routes(),
  timetableRouter.routes(),
  notificationRouter.routes(),
  attributesRouter.routes()
  );

module.exports = router;
