const Router = require('koa-router');

const router = new Router();

const timetables = [];
timetables.push({
  timetableName: 'Baikal schedul',
  type: 'Hours',
  startPeriod: '5 Mar 2020',
  endPeriod: '7 Mar 2020',
});
timetables.push({
  timetableName: 'Azov schedul',
  type: 'Hours',
  startPeriod: '12 Mar 2020',
  endPeriod: '15 Mar 2020',
});
timetables.push({
  timetableName: 'Metro schedul',
  type: 'Hours',
  startPeriod: '4 Apr 2020',
  endPeriod: '7 Apr 2020',
});

router.get('/timetables', async (ctx, next) => {
  ctx.response.body = timetables;
});

module.exports = router;
