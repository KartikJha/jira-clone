const logger = require("./logger");
// const  = require("./send-response");

const wrapInArray = (a) => { return a instanceof Array ? a : a ? [a] : [];}

const withFailSafe = (value, message) => (target) => async (...args) => {
  try {
		const val = await target(...args);
    return val;
  } catch (e) {
		logger.error(e.stack); 
		if (sendResponse) {
			return sendResponse(args[1], 500, message, {}, [e.stack], value);
		} 
    return args[1].status(500).send("Error");
  }
};

const wrapServiceResult = (value, errors) => {
 return {
	 value,
	 errors: wrapInArray(errors)
 }
}

const sendResponse = (res, status, message, headers, errors, data) => {
	res.status(status || 200).send({
		status,
		message: wrapInArray(message),
		data,
		errors: wrapInArray(errors),
	});
}

module.exports = {
	wrapInArray,
	withFailSafe,
	wrapServiceResult,
	sendResponse
}