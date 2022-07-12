// module/api for searching and scraping chapters/links from popular manga websites / databases

const puppeteer = require('puppeteer');
const DEBUG = false;

/*
scraper superclass which all the manga site scrapers will inherit from
scraper objects have a private _site field which is a string/link to the site they scrape
note after using scraper objects, at the end call <scraper object>.close_browser() to make sure all tabs/the browser is closed
*/
class scraper {
    constructor(site, results = [], browser = null) {
        this._site = site;
        this._results = results;
        this._browser = browser;
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

    async goto_site(site) {
        try {
            if (this._browser != null){
                const page = await this._browser.newPage()
                await page.goto(site);
                return page;
            }
            else {
                this._browser = await scraper.make_browser(DEBUG);
                const page = await this._browser.newPage();
                await page.goto(site);
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
    constructor(chapters = []) {
        super('https://manganato.com/');
        this._chapters = chapters;
    }

    get_results(){
        return this._results;
    }

    /*
    returns an array of href links to manganelo links that show up after searching for the specified manga_title
    manga_title: string -> array<string/links>
    */ 
    async search(manga_title) {
        try {
            let homepage = await this.goto_site(this._site);

            // searches for specified manga_title on manganelo
            await homepage.type('#search-story', manga_title);
            await homepage.keyboard.press('Enter');
            await homepage.waitForNavigation();

            // matches all css selectors *the href, img, and title is contained inside each of these search-story-item elements*
            const results = await homepage.$$eval('div.search-story-item > a.item-img', search_story_items => {
                return search_story_items.map(story_elm => ({manga:story_elm.title, link:story_elm.href, dp:story_elm.querySelector('img.img-loading').src}))});

            this._results = results;
        }
        
        catch (err){
            throw `unable to search for ${manga_title} @ ${this._site}`;
        }
    }

    /*
    grabs all the chapters, images, and titles associated with a manganelo page in this._results
    used to index and gather all current chapters 
    */
    async get_chapters(link){
        try {
            let page = await this.goto_site(link);
            const chapters = await page.$$eval('ul.row-content-chapter > li.a-h > a', chapters => {
                return chapters.map(chapter_elm => ({chapter:chapter_elm.title, link:chapter_elm.href}))});

            this._chapters = chapters;
        }
        catch (err){
            throw `unable to find any chapters at ${link}`;
        }  
    }
}


// let grabasyncdata = async () => {
//     const manganelo = new manganelo_scraper();
//     await manganelo.search('toilet bound hanako kun');
//     console.log(manganelo._results);
//     // await manganelo.get_chapters(manganelo._results[0].link);
//     // console.log(manganelo._chapters);
//     await manganelo.close_browser();
// }

// grabasyncdata();

module.exports = {scraper, manganelo_scraper};