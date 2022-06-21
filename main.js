// electron.js main file to run the event loop

const {app, BrowserWindow} = require('electron');
const path = require('path');

const load_main_window = () => {
    const main_window = new BrowserWindow({
        width : 1200,
        height : 800,
        webPreferences: {
            nodeIntegration : true
        }
    });
}