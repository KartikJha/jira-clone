var express = require("express");
const logger = require("../utils/logger");
var router = express.Router();
const sprintService = require("../service/sprint-service");
const { withFailSafe, sendResponse } = require("../utils/common");
const messages = require("../utils/messages");
const { isEmpty } = require("lodash");
const { entity } = require("../constants");

/* GET users listing. */
// router.get("/", (req, res) =>
//   withFailSafe(
//     [],
//     messages.FAILED_TO_FETCH(entity.PORTFOLIO)
//   )(async (req, res) => {
//     return sendResponse(res, 400, messages.SUCCESS, {}, errors, []);
//   })(req, res)
// );

router.post("/", (req, res) =>
  withFailSafe(
    null,
    messages.FAILED_TO_ADD(entity.SPRINT)
  )(async (req, res) => {
    const { value, errors } = await sprintService.addSprint(
      req.user,
      req.body
    );
    if (isEmpty(errors)) {
      return sendResponse(res, 201, messages.SUCCESS, {}, [], value);
    }
    return sendResponse(res, 500, messages.UNKNOWN_ERROR, {}, errors, {});
  })(req, res)
);

router.patch("/:sprintId", (req, res) =>
  withFailSafe(
    null,
    messages.UPDATE_FAILED(entity.SPRINT)
  )(async (req, res) => {
    const { sprintId } = req.params;
    if (!sprintId) {
      return sendResponse(
        res,
        400,
        "",
        {},
        [messages.ID_REQUIRED_FOR_UPDATE(entity.SPRINT)],
        {}
      );
    }
    const { value, errors } = await sprintService.addTasks(req.body, req.user, sprintId);
    if (isEmpty(errors)) {
      return sendResponse(res, 200, messages.SUCCESS, {}, [], value);
    }
    return sendResponse(res, 400, "", {}, errors, {});
  })(req, res)
);


module.exports = router;
