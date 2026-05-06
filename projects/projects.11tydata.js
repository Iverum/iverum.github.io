module.exports = {
	permalink: function ({ title }) {
		return `/projects/${this.slugify(title)}/`;
	},
};