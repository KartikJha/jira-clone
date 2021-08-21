const { wrapServiceResult } = require("../utils/common");
const Tasks = require("../models/Task");
const messages = require("../utils/messages");
const { isEmpty } = require("lodash");
const { entity } = require("../constants");
const logger = require("../utils/logger");
const constants = require("../constants");

async function createTask(user, body) {
	if (!body.assignee || !body.type || !user)  {
		return wrapServiceResult([], "Assignee and type are required");
	}
	const task = new Tasks({
		assignee: body.assignee,
		type: body.type,
		createdBy: user.email
	});
	const savedTask = await task.save();
	return wrapServiceResult(savedTask, []);
}

async function transitionTask(user, body) {
	if (!body.taskId) {
		return wrapServiceResult(null, [
			"taskid is required"
		]);
	}
	const task = Task.findById(body.taskId);
	const from = task.status, to = body.status;
	const {isDone, errors} = transitionTask(task, from, to);
	if (isDone) {
		task.status = to;
		const savedTask = await task.save();
		return wrapServiceResult(savedTask, []);
	}
	return wrapServiceResult(isDone, errors);
}

async function transitionTask(task, from, to) {
	const type = task.type;
	const transitionArray = constants.transitionMap[type];
	if (!transitionArray) {
		return wrapServiceResult(false, ["Invalid task type"]);
	}
	for (let i = 0; i < transitionArray.length; i++) {
		const status = transitionArray[i];
		if (status.length) {
			if (flag) {
				if (status.indexOf(to) != -1) {
					return wrapServiceResult(true, []);
				}
				return wrapServiceResult(false, []);
			} else {
				if (status.indexOf(from) != -1) {
					flag = true;
				}
			}
		} else {
			if (flag) {
				if (status == to) {
					return wrapServiceResult(true, []);
				}
				return wrapServiceResult(false, [])
			} else {
				if (status == from) {
					flag = true;
				}
			}
		}
		return wrapServiceResult(false, [])
	}
}

async function updateTask(body, user) {
	if (!body.taskId) {
		return wrapServiceResult(null, [
			"taskid is required"
		]);
	}
	const task = Task.findById(body.taskId);
	const { assignee } = body;
	if (assignee) {
		task.assignee = assignee;
	}
	const savedTask = task.save();
	return wrapServiceResult(savedTask, []);
}

async function addSubTrack(user, body) {
	if (!body.taskId || !body.subTrack) {
		return wrapServiceResult(null, [
			"taskid is required"
		]);
	}
	const task = Task.findById(body.taskId);
	task.subTrack.push({
		name: body.subTrack.name,
		assignee: body.subTrack.assignee
	})
	const savedTask = await task.save();
	return wrapServiceResult(savedTask, []);
}

module.exports = {
	createTask,
	transitionTask,
	updateTask,
	addSubTrack
}