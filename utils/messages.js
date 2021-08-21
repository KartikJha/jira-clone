module.exports = {
	USER_CREATED: 'User created successfully',
	USER_CREATION_FAILED: 'Failed to create users',
	USER_ALREADY_EXISTS: 'User already exists',
	UNKNOWN_ERROR: 'Unknown error',
	FAILED_TO_FETCH_USERS: 'Failed to fetch users',
	FAILED_TO_FETCH: (resource) => `Failed to fetch ${resource}`,
	SUCCESS: 'Success',
	TRADE_FAILED: 'Trade failed',
	TRADE_PLACED: 'Trade placed',
	SHOULD_BE_POSITIVE: (resource) => `${resource} should be >= 0`,
	CANNOT_BE_EMPTY: (resource) => `${resource} cannot be empty or null`,
	FAILED_TO_ADD: (resource) => `Failed to add ${resource}`,
	STOCK_TRADE_AVAILABILITY: (avail, target) => `Available ${avail}, trying to sell ${target}`,
	UPDATE_FAILED: (resource) => `${resource} update failed`,
	ID_REQUIRED_FOR_UPDATE: (resource) => `ID required for ${resource} update`,
	ID_REQUIRED_FOR_FETCH: resource => `ID required for ${resource} fetch`
}