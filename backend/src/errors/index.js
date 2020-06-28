'use strict';

const WRONG_REQUEST_BODY = 'wrong request body';
const WRONG_NAME_OR_PASSWORD = 'Not authorized';
const USER_ALREADY_HAS_ORDER = 'This user ordered this slot already';
const DONT_HAVE_ADMINER_RIGHT = 'This user dosen\'t have adminer rights';

module.exports = {
  wrongBody: WRONG_REQUEST_BODY,
  unauthrorized: WRONG_NAME_OR_PASSWORD,
  userHasOrderAlready: USER_ALREADY_HAS_ORDER,
  noAdminerRights: DONT_HAVE_ADMINER_RIGHT,
};
