'use strict';

const Router = require('koa-router');

const timetableInterface = require('../interfaces/itimetables');

const router = new Router();

router

  .get('/timetables', async (ctx, next) => {

    let timetables =
      await timetableInterface.getAllTimetables();

    ctx.response.body = {timetables};
  })

  .post('/timetables', async (ctx, next) => {

    await timetableInterface
      .createTimetable(
        ctx.request.body,
        ctx.session.adminer
      );

    ctx.response.body = {message: 'ok'};
  })

  .get('/timetables/:id', async (ctx, next) => {
    
    let timetable =
      await timetableInterface
        .getTimetableById(ctx.params.id);

    ctx.response.body = {timetable};
  })

  .put('/timetables/:id', async (ctx, next) => {

    await timetableInterface
      .updateTimetable(
        ctx.params.id,
        ctx.request.body,
        ctx.session.adminer
      );

    ctx.response.body = {message: 'ok'};
  })

  .delete('/timetables/:id', async (ctx, next) => {

    await timetableInterface
      .deleteTimetable(
        ctx.params.id,
        ctx.session.adminer
      );

    ctx.response.body = {message: 'ok'};
  });

module.exports = router;