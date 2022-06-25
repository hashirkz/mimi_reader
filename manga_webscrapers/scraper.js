// module for scraper objects to search manga databases

const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const DEBUG = true;

/*
scraper superclass which all the manga site scrapers will inherit from
scraper objects have a private _site field which is a string/link to the site they scrape
*/
class scraper{
    constructor(_site) {
        this._site = _site;
        this._browser = null;
    }
    
    static async make_browser(debug = false) {
        if (debug){
            return await puppeteer.launch({
                headless: false,
                slowMo: 250,
                devtools: true,
            });
        }
        else return await puppeteer.launch();
    }

    get_site() {
        return this._site;
    }

    set_site(site) {
        this._site = site;
    }

    async goto_site() {
        try {
            if (this._browser !== null){
                const page = await this._browser.newPage()
                await page.goto(this._site);
                return page;
            }
            else {
                this._browser = await scraper.make_browser(DEBUG);
                const page = await this._browser.newPage();
                await page.goto(this._site);
                return page;
            }
        } 
        catch (err) {
            throw `unable to navigate to ${this.get_site()}`;
        }
    }

    async close_browser() {
        if (this._browser !== null){
            await this._browser.close();
        }
    }
}

/*
subclass for webscraping manganato.com *formerly manganelo*
functions to grab specific titles / imgs / metadata and to
grab manga chapters / search for titles
*/
class manganelo_scraper extends scraper{
    constructor() {
        super('https://manganato.com/');
    }

    async search(manga_title) {
        try {
            let homepage = await this.goto_site();
            await homepage.type('#search-story', manga_title);
            await homepage.keyboard.press('Enter');
            await homepage.waitForNavigation();
            const results = await homepage.$$eval('.search-story-item > h3 > a', search_story_items => search_story_items.map(story => story.href))
            console.log(results);
            await this.close_browser();
        }
        
        catch (err){
            throw `unable to search for ${manga_title} @ ${this._site}`;
        }
    }
}



// const manga_scraper = new scraper('https://readmanganato.com/manga-cp980050');
// console.log(manga_scraper.get_site());
// manga_scraper.goto_site();
// console.log(manga_scraper);

const manga_scraper = new manganelo_scraper();
manga_scraper.search('re zero');

module.exports = {scraper};