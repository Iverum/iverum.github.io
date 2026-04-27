const Fetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
    const rssFeed = await fetchLetterboxdRss();
    const letterboxd = getItems(rssFeed);
    return { letterboxd };
};

async function fetchLetterboxdRss() {
    let url = "https://letterboxd.com/iverum/rss/";

    return await Fetch(url, {
        duration: "1d",
        type: "parsed-xml",
    });
}

function getItems(response, itemCount = 3) {
    const channel = response.children[0].children.find(child => child.name === 'channel').children;
    const items = channel.filter(child => child.name === 'item');
    return items.slice(0, itemCount).map(parseRssEntryToJson);
}

function parseRssEntryToJson(item) {
    const { children } = item;
    const title = children.find(c => c.name === 'title').children[0].text;
    const link = children.find(c => c.name === 'link').children[0].text;
    const watchedDate = children.find(c => c.name === 'letterboxd:watchedDate').children[0].text;
    const rewatch = children.find(c => c.name === 'letterboxd:rewatch').children[0].text === 'Yes';
    const description = children.find(c => c.name === 'description').children[0].text;
    return { title, link, watchedDate, rewatch, description }
}
