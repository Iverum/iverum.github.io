require('dotenv').config();

const { AssetCache } = require("@11ty/eleventy-fetch")

const airtable = require('airtable');

airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
const BASE_ID = 'appARRXfFPKbUy90u';
const projectBase = airtable.base(BASE_ID);

module.exports = async function () {
	const base = new ProjectBase();
	const projects = await base.loadBase();
	return {
		projects,
	};
};

class ProjectBase {
	constructor() {
		this.baseId = 'appARRXfFPKbUy90u';
		this.base = airtable.base(this.baseId);
		this.cache = null;
	}

	async loadBase() {
		this.cache = new AssetCache(`base-${BASE_ID}`);
		if (this.cache.isCacheValid('1h')) {
			return this.cache.getCachedValue();
		}

		console.log(`fresh airtable cache: ${BASE_ID}`);
		// Yes, we do this in a very slow way. It's a small dataset.
		const projects = await this.loadProjects();
		const tasks = await this.loadTasks();
		this.associateTasksToProjects(projects, tasks);
		await this.cache.save(projects, "json");
		return projects;
	}

	async loadProjects() {
		return await new Promise((resolve, reject) => {
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
					taskIds: record.get("Tasks") || [],
				}));
				fetchNextPage();
			}, function done(err) {
				if (err) { console.error(err); reject(err); }
				resolve(projects);
			});
		})
	}

	async loadTasks() {
		return await new Promise((resolve, reject) => {
			var tasks = {};
			projectBase('Tasks').select({
				maxRecords: 10,
				view: "Grid view"
			}).eachPage(function page(records, fetchNextPage) {
				records.forEach(record => {
					tasks = {
						...tasks, [record.id]: {
							name: record.get("Name"),
							status: record.get("Status"),
						}
					}
				});
				fetchNextPage();
			}, function done(err) {
				if (err) { console.error(err); reject(err); }
				resolve(tasks);
			});
		})
	}

	associateTasksToProjects(projects = [], tasks = {}) {
		projects.forEach(project => {
			project.tasks = project.taskIds.map(taskId => tasks[taskId]);
		});
	}
}
