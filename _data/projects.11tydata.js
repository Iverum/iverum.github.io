require('dotenv').config();

const { AssetCache } = require("@11ty/eleventy-fetch")

const airtable = require('airtable');

airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
const BASE_ID = 'appARRXfFPKbUy90u';
const projectBase = airtable.base(BASE_ID);

module.exports = async function () {
	const projects = await getProjects();
	return {
		projects,
	}
};

async function getProjects() {
	const cache = new AssetCache(`base-${BASE_ID}`)
	if (cache.isCacheValid('1h')) {
		return cache.getCachedValue();
	}

	console.log(`fresh airtable cache: ${BASE_ID}`)
	const projects = await new Promise((resolve, reject) => {
		const projects = [];
		projectBase('Projects').select({
			maxRecords: 10,
			view: "Grid view"
		}).eachPage(function page(records, fetchNextPage) {
			records.forEach(record => projects.push({
				id: record.id,
				name: record.get("Name"),
				totalTasks: record.get("# Tasks (Total)"),
				completedTasks: record.get("# Tasks (Done)"),
				taskIds: record.get("Tasks"),
			}));
			fetchNextPage();
		}, function done(err) {
			if (err) { console.error(err); reject(err); }
			resolve(projects);
		});
	})
	await cache.save(projects, "json");
	return projects;
}