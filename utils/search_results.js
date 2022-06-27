/*
eventloop script to update 
*/ 

const electron = require('electron');
const {scraper, manganelo_scraper} = require('../manga_webscrapers/scraper');

let cur_search = document.getElementById('search');
let display_results = async () => {
    const manganelo_scraper = new manganelo_scraper();
    await manganelo_scraper.search(cur_search.value);
    await manganelo_scraper.close_browser();
    console.log(manganelo_scraper._results);
}

cur_search.addEventListener('input', display_results);


