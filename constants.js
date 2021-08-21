module.exports = {
	entity: {
		SPRINT: 'SPRINT',
		TASK: 'TASK'
	},
	sprintStatus: {
		open: 'Open',
		inProgress: 'In Progress',
		completed: 'Completed'
	},
	transitionMap: {
		feature: ["Open", "In progress", ["Testing", "Deployed"], "Deployed"],
		bug: ["Open", "In Progress", "Fixed"],
		story: ["Open", "In Progress", "Completed"],
		subTrack: ["Open", "In Progress", "Fixed"]
	}
}