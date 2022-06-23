// fetch script for manganelo *readmanganato.com* searches

const fetch = require('fetch');
const puppeteer = require('puppeteer');

let read_data = async path => {

    const __text = await fetch(path);
    const __json = await __text.json();
    
    console.log(__json);
}

console.log(read_data('https://readmanganato.com/'));

