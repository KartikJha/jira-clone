var express = require("express");
const logger = require("../utils/logger");
var router = express.Router();
const { withFailSafe, sendResponse } = require("../utils/common");
const messages = require("../utils/messages");
const { isEmpty } = require("lodash");
const { entity } = require("../constants");
const taskService = require('../service/task-service');

/* GET users listing. */
router.get("/", (req, res) =>
  withFailSafe(
    [],
    messages.FAILED_TO_FETCH(entity.TASK)
  )(async (req, res) => {
    return sendResponse(res, 400, messages.SUCCESS, {}, errors, []);
  })(req, res)
);

router.post("/", (req, res) =>
  withFailSafe(
    null,
    messages.FAILED_TO_ADD(entity.TASK)
  )(async (req, res) => {

    const { value, errors } = await taskService.createTask(req.user, req.body);
    if (isEmpty(errors)) {
      return sendResponse(res, 201, messages.SUCCESS, {}, [], value);
    }
    return sendResponse(res, 500, messages.UNKNOWN_ERROR, {}, errors, {});
  })(req, res)
);

router.patch(":taskId/transition", (req, res) =>
  withFailSafe(
    null,
    messages.FAILED_TO_ADD(entity.TASK)
  )(async (req, res) => {
    const { value, errors } = await taskService.transitionTask(req.user, req.body);
    if (isEmpty(errors)) {
      return sendResponse(res, 201, messages.SUCCESS, {}, [], value);
    }
    return sendResponse(res, 500, messages.UNKNOWN_ERROR, {}, errors, {});
  })(req, res)
);

router.patch(":taskId", (req, res) =>
  withFailSafe(
    null,
    messages.FAILED_TO_ADD(entity.TASK)
  )(async (req, res) => {
    const { value, errors } = await taskService.updateTask(req.body, user);
    if (isEmpty(errors)) {
      return sendResponse(res, 201, messages.SUCCESS, {}, [], value);
    }
    return sendResponse(res, 500, messages.UNKNOWN_ERROR, {}, errors, {});
  })(req, res)
);

router.post(":taskId", (req, res) =>
  withFailSafe(
    null,
    messages.FAILED_TO_ADD(entity.TASK)
  )(async (req, res) => {
    const { value, errors } = await taskService.addSubTrack(req.user, req.body);
    if (isEmpty(errors)) {
      return sendResponse(res, 201, messages.SUCCESS, {}, [], value);
    }
    return sendResponse(res, 500, messages.UNKNOWN_ERROR, {}, errors, {});
  })(req, res)
);


module.exports = router;
