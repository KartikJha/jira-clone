const pino = require("pino");

const getLoggerConfig = () =>  {
	const configObj = { name: "logger", prettyPrint: true };
	if (process.env.LOG_LEVEL && process.env.LOG_LEVEL !== "ALL") {
		configObj.level = process.env.LOG_LEVEL;
	}
	return configObj;
}

module.exports = pino(getLoggerConfig());



