require('dotenv').config();

const airtable = require('airtable');

airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
const projectBase = airtable.base('appARRXfFPKbUy90u');

module.exports = async function () {
	const projects = await getProjects();
	return {
		permalink: function ({ title }) {
			return `/projects/${this.slugify(title)}/`;
		},
	}
};

function getProjects() {
	return new Promise((resolve, reject) => {
		const projects = [];
		projectBase('Projects').select({
			maxRecords: 10,
			view: "Grid view"
		}).eachPage(function page(records, fetchNextPage) {
			records.forEach(record => projects.push(record));
			fetchNextPage();
		}, function done(err) {
			if (err) { console.error(err); reject(err); }
			resolve(projects);
		});
	})
}