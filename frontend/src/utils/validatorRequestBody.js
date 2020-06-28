function isValidCreateTimetableBody(body) {

  function getDateInterval(periodStart, periodStop) {
    return (new Date(periodStop) - new Date(periodStart)) /
      (60 * 60 * 24 * 1000);
  }

  function getTimeInterval(periodStart, periodStop) {
    return new Date(periodStop).getHours() - new Date(periodStart).getHours();
  }

  if (isNaN(+body.numberColumn)) {
    //TODO notification
    return false;
  }
  if (isNaN(+body.numberRow)) {
    //TODO notification
    return false;
  }
  if (new Date(body.periodStart) == 'Invalid Date') {
    //TODO notification
    return false;
  }
  if (new Date(body.periodStop) == 'Invalid Date') { 
    //TODO notification
    return false;
  }
  if (new Date(body.periodStart) - new Date(state.periodStop) > 0) {
    //TODO notification
    return false;
  }
  if (getTimeInterval(body.periodStart, body.periodStop) !== numberColumn) {
    //TODO notification
    return false;
  }
  if (getDateInterval(body.periodStart, body.periodStop) !== (numberColumn - 1)) {
    //TODO notification
    return false
  }
  return true;
}

function isValidLoginBody(body) {
  if (body.username.length === 0) {
    //TODO notification
    return false;
  }
  if (body.password.length === 0) {
    //TODO notification
    return false;
  }
  return true;
};

function isValidRegisterBody(body) {
  if (body.username.length === 0) {
    //TODO notification
    return false;
  }
  if (body.password.length === 0) {
    //TODO notification
    return false;
  }
  if (body.email.length === 0) {
    //TODO notification
    return false;
  }
  return true;
}

function isValidUpdateUserBody(body) {
  for (let key of Object.keys(body)) {
    if (body[key].length === 0) {
      //TODO notification
      return false;
    }
  }
  return true;
}

export default {
  isValidCreateTimetableBody,
  isValidLoginBody,
  isValidRegisterBody,
  isValidUpdateUserBody
}