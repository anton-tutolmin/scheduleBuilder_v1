'use strict';

const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../../models');

passport.use(
  'local',
  new LocalStrategy((username, password, done) => {
    db.user
      .findOne({
        where: {
          username: username,
        },
      })
      .then(user => {
        if (!user) {
          done(null, false, { message: 'Wrong username' });
        } else if (user.dataValues.password !== password) {
          done(null, false, { message: 'Wrong password' });
        } else {
          done(null, user);
        }
      })
      .catch(err => {
        done(err, false);
      });
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.user.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
