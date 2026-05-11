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
    console.log({ project: projects.find(p => p.id === projectId), projectId });
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