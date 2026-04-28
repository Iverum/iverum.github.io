require('dotenv').config()

const Fetch = require("@11ty/eleventy-fetch");
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

module.exports = async function () {
    const letterboxd = await getLetterboxdData();
    const gunpla = await getGunplaData();
    return { letterboxd, gunpla };
};

/* LETTERBOXD */
async function getLetterboxdData() {
    const rssFeed = await fetchLetterboxdRss();
    return getItems(rssFeed);
}

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

/* Google Sheets */
async function getGunplaData() {
    const gunplaSheet = new Spreadsheet(process.env.GUNPLA_SHEET_ID);
    const gunpla = await gunplaSheet.sheet();
    return gunpla.filter(g => g.Status === 'In Progress');
}


class Spreadsheet {
    constructor(spreadsheetId) {
        this.spreadsheetId = spreadsheetId;
        this.cache = null;
        this.spreadsheet = null;
    }

    async sheet() {
        this.cache = new Fetch.AssetCache(`spreadsheet-${this.spreadsheetId}`);
        if (this.cache.isCacheValid('1h')) {
            return this.cache.getCachedValue();
        }

        await this.loadSpreadsheet();
        const sheet = this.spreadsheet.sheetsByIndex[0];
        console.log(`fresh spreadsheet cache: ${this.spreadsheet.title} (${sheet.title})`);
        const rows = await sheet.getRows();
        const fields = sheet.headerValues;
        const data = rows.map(row => Object.fromEntries(fields.map(f => [f, row.get(f)])));
        await this.cache.save(data, "json");
        return data;
    }

    async loadSpreadsheet() {
        if (this.spreadsheet) return;

        this.spreadsheet = new GoogleSpreadsheet(this.spreadsheetId, this.getJwt());
        await this.spreadsheet.loadInfo();
    }

    getJwt() {
        const SCOPES = [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.file',
        ];

        return new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
            scopes: SCOPES,
        });
    }
}
