var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sprint = new Schema({
	name:  { type: String, required: true },
	startDate: { type: Date, default: Date.now()},
	endDate:  { type: Date, default:  Date.now()},
	createdDate: {
		type: Date, required: true,
		default: Date.now()
	},
	status: { 
		type: String,
		enum: ["Open", "In Progress", "Completed"],
		default: "Open",
	},
	taskId: {
		type: Array,
		default: []
	},
	createdBy: { type: String, required: true },
	sprints: [Number]
});

module.exports = mongoose.model('Sprints', sprint);