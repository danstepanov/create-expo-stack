/**
 * @type {import("lint-staged").Config}
 */
module.exports = {
	'*': 'bun run prettier --list-different'
}
