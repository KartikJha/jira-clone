const { wrapServiceResult } = require("../utils/common");
const Sprint = require("../models/Sprint");
const messages = require("../utils/messages");
const { isEmpty, get, wrap } = require("lodash");
const { entity, tradeType } = require("../constants");
const stockService = require("./task-service");
const constants = require('../constants');
const Task = require('../models/Task');

async function addSprint(user, body) {
  if (!body.name || !user) {
    return wrapServiceResult(null, [
      "name is required"
    ]);
  }
  const sprint = new Sprint({
    name: body.name,
    createdBy: user.email
  });
  const status = await sprint.save();
	return wrapServiceResult(status, []);
}

async function addTasks( body, user, sprintId) {
  if (!body.taskId) {
    return wrapServiceResult([], "No task id");
  }
  const task = await Task.findById(body.taskId);
  if (task.planned) {
    return  wrapServiceResult([], "Task is already planned");
  }
  const sprint = Sprint.findById(sprintId);
  if (!sprint) {
    return wrapServiceResult([], "Sprint not found");
  }
  sprint.taskId.push(taskId);
  task.planned = true;
  const savedSprint = await sprint.save();
  const savedTask = await task.save();
  return wrapServiceResult(savedSprint, []);
}

async function removeTasks( body, user, sprintId) {
  if (body.taskId) {
    return wrapServiceResult([], "No task id");
  }
  const task = Task.findById(body.taskId);
  if (!task.planned) {
    return  wrapServiceResult([], "Task is not planned");
  }
  const sprint = Sprint.findById(sprintId);
  if (!sprint) {
    return wrapServiceResult([], "Sprint not found");
  }
  sprint.taskId = sprint.taskId.filter(tId => tId != body.taskId);
  task.planned = false;
  const savedSprint = await sprint.save();
  const savedTask = await task.save();
  return wrapServiceResult(savedSprint, []);
}

async function startSprint(body, user, sprintId) {
  const sprint = Sprint.findById(sprintId);
  if (!sprint) {
    return wrapServiceResult([], "Sprint not found");
  }
  if (!sprint.status != constants.sprintStatus.open) {
    return wrapServiceResult([], "Cannot start completed or in-progress sprint");
  }
  sprint.startDate = new Date();
  sprint.status = constants.sprintStatus.inProgress;
  const savedSprint = await sprint.save();
  return wrapServiceResult(savedSprint, []);
}

async function endSprint(body, user, sprintId) {
  const sprint = Sprint.findById(sprintId);
  if (!sprint) {
    return wrapServiceResult([], "Sprint not found");
  }
  if (!sprint.status != constants.sprintStatus.inProgress) {
    return wrapServiceResult([], "Cannot end completed or open sprint");
  }
  sprint.endDate = new Date();
  sprint.status = constants.sprintStatus.completed;
  const savedSprint = await sprint.save();
  return wrapServiceResult(savedSprint, []);
}

module.exports = {
  addSprint,
  endSprint,
  startSprint,
  removeTasks,
  addTasks
};
