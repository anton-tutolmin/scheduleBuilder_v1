const path = require('path');
const Koa = require('koa');
const KoaBody = require('koa-body');
const send = require('koa-send');
const serve = require('koa-static');
const session = require('koa-session');
const passport = require('./middleware/passport/passport');
const router = require('./middleware/router');

const staticDir = path.resolve(__dirname, '..', '..', 'public');
const app = new Koa();

app.keys = ['secret'];

app.use(KoaBody());
app.use(session({}, app));
app.use(passport.initialize());
app.use(passport.session());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.body = {error: err.message};
  }
});

app.use(router.routes());

app.use(serve(staticDir));

// Default route
app.use(async function(ctx) {
  await send(ctx, 'index.html', { root: staticDir });
});

app.listen(3000, () => {});
