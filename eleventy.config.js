const { DateTime } = require("luxon");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles/");
  eleventyConfig.addPassthroughCopy("media/");

  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItFootnote));

  eleventyConfig.addFilter("dateISO", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });
};