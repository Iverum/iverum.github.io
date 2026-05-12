const { DateTime } = require("luxon");
const markdownItFootnote = require("markdown-it-footnote");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles/");
  eleventyConfig.addPassthroughCopy("media/");

  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItFootnote));

  eleventyConfig.addFilter("dateISO", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  eleventyConfig.addShortcode("project", function (projectId) {
    const { ctx: { environments } } = this;
    const { projects } = environments['projects.11tydata'];
    const project = projects.find(p => p.id === projectId);
    const percentComplete = (project.completedTasks / project.totalTasks) * 100;
    console.log({ project, projectId, percentComplete });


    return `
    <section class="project-pane">
      <div class="progress-bar-background"></div>
      <div class="progress-bar" style="width: calc(${percentComplete}% + 2rem);"></div>
      <ul>
        <li>Need to fetch tasks</li>
      </ul>
    </section>
    `
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: {
      name: "posts",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "Blake Hair",
      subtitle: "Personal blog of Blake Hair",
      base: "https://blakehair.com/",
      author: {
        name: "Blake Hair",
        email: "", // Optional
      }
    }
  });
};