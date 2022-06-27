// electron.js main file to run the event loop


const { createPublicKey } = require('crypto');
const electron = require('electron');
const path = require('path');
const url = require('url');
const scrapers = require('./manga_webscrapers/scraper.js');


let load_main_window = () => {
    const main_window = new electron.BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // make the main window *fullscreen windowed*
    main_window.maximize();
    main_window.show();

    const main_menu_template = [
        {
            label: 'devtools',
            click: () => {
                main_window.getFocusedWindow().toggleDevTools();
            }
        },
        // {label: 'bookmarked'},
        // {label: 'history'},
        // {label: 'settings'},
    ];
    
    const main_menu = electron.Menu.buildFromTemplate(main_menu_template);
    electron.Menu.setApplicationMenu(main_menu);

    main_window.loadURL(path.join(__dirname, 'main_window.html'));

};

electron.app.on('ready', load_main_window);