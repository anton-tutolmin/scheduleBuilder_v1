'use strict'

const timetableQueries = require('../dbqueries/timetable');
const attributeInterface = require('./iattribute');

const errors = require('../../errors');

const getAllTimetables = async () => {
  let timetables = await timetableQueries.getAll();

  for (let timetable of timetables) {

    timetable.attributes =
      await attributeInterface
        .getAttributesByTimetableId(timetable.id);

  }

  return timetables;
}

const getTimetableById = async id => {
  let timetable = await timetableQueries.getById(id);

  timetable.attributes =
    await attributeInterface
      .getAttributesByTimetableId(timetable.id);

  return timetable;
}

const createTimetable = async (body, isAdminer) => {
  validateCreateBody(body);
  
  if (!isAdminer) {
    throw new Error(errors.noAdminerRights);
  }

  let timetable = await timetableQueries.create({
    name: body.name,
    periodStart: body.periodStart,
    periodStop: body.periodStop,
    numberRow: body.numberRow,
    numberColumn: body.numberColumn,
    slotType: body.slotType
  });

  for (let attribute of body.attributes) {
    attribute.timetableId = timetable.id;
    await attributeInterface.createAttribute(attribute);
  }
}

const updateTimetable = async (id, body, isAdminer) => {
  validateUpdateBody(body);

  if (!isAdminer) {
    throw new Error(errors.noAdminerRights);
  }

  await timetableQueries.update(id, body);
}

const deleteTimetable = async (id, isAdminer) => {

  if (!isAdminer) {
    throw new Error(errors.noAdminerRights);
  }

  await timetableQueries.delete(id);
}

const validateCreateBody = body => {
    body = Object.keys(body);
    console.log(body);
    if (
      body.length !== 6 ||
      !body.includes('name') ||
      !body.includes('numberRow') ||
      !body.includes('numberColumn') ||
      !body.includes('periodStart') ||
      !body.includes('periodStop') ||
      !body.includes('attributes')
    ) {
      throw new Error(errors.wrongBody);
    }
  }
  
  const validateUpdateBody = body => {
    if (Object.keys(body).every(
      param =>
      param !== 'name' &&
      param !== 'numberRow' &&
      param !== 'numberColumn' &&
      param !== 'periodStart' &&
      param !== 'periodStop' &&
      param !== 'slotType'
      )) {
        throw new Error(errors.wrongBody);
      }
  };

module.exports = {
  getAllTimetables,
  getTimetableById,
  createTimetable,
  updateTimetable,
  deleteTimetable
};