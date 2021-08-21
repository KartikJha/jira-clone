var mongoose = require('mongoose');
const messages = require('../utils/messages');
const { entity } = require('../constants');
var Schema = mongoose.Schema;

var subTrack = new Schema({
	assignee:  { type: String, required: true },
	name:  { type: String, required: true },
	status: {
		type: String,
		enum: ["Open", "In Progress", "Testing", "Deployed", "Fixed", "Completed"],
		default: "Open"
	}
});

var taskSchema = new Schema({
	assignee:  { type: String, required: true },
	type: { 
		type: String,
		enum: ["Feature", "Story", "Bug"],
		default: "Feature",
		required: true
	},
	status: {
		type: String,
		enum: ["Open", "In Progress", "Testing", "Deployed", "Fixed", "Completed"],
		default: "Open"
	},
	subTracks: [subTrack],
	createdBy: { type: String, required: true }
});

module.exports = mongoose.model('Tasks', taskSchema);