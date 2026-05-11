module.exports = async function () {
    return {
        permalink: function ({ title }) {
            return `/projects/${this.slugify(title)}/`;
        },
    }
};