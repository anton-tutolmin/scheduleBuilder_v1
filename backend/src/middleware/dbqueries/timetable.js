'use strict'

const Timetables = require('../../models').timetable;

const getAll = async () => {
  let timetables = await Timetables.findAll();
  return timetables.map(timetable => timetable.dataValues);
} 

const getById = async id => {
  let timetable = await Timetables.findOne({
    where: {
      id
    }
  });
  return timetable.dataValues;
}

const create = async body => {
  return await Timetables.create(body);
}

const update = async (id, body) => {
  await Timetables.update(
    body,
    {
      where: {
        id
      }
    }
  );
}

const remove = async id => {
  await Timetables.destroy({
    where: {
      id
    }
  });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}
