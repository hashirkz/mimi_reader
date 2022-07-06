/*
eventloop script to update search results
*/ 

// const electron = require('electron');
let { scraper, manganelo_scraper } = require('/manga_webscrapers/scraper.js');


let cur_search = document.getElementById('search');
async function display_results(){
    const manganelo_scraper = new manganelo_scraper();
    await manganelo_scraper.search(cur_search.value);
    await manganelo_scraper.close_browser();
    console.log(manganelo_scraper._results);
}

cur_search.addEventListener('input', Promise.all(display_results));


