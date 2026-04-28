module.exports = {
	permalink: function ({ title }) {
		return `/posts/${this.slugify(title)}/`;
	},
};