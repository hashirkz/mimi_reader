// electron.js main file to run the event loop


const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let load_main_window = () => {
    const main_window = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    main_window.loadURL(url.format({
        pathname: path.join(__dirname, 'main_window.html'),
        protocl: 'file:',
        slashes: true
    }));

};

app.on('ready', load_main_window);

