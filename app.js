// electron.js main file to run the event loop


const electron = require('electron');
const path = require('path');
const url = require('url');
const scrapers = require('./manga_webscrapers/scraper.js');


// main menu template/hotbar 
const main_menu_template = [
    {
        label: 'devtools',
        accelerator: 'Ctrl+I',
        click: (item, focused_window) => focused_window.toggleDevTools(),
    },
    {
        label: 'quit',
        accelerator: 'Alt+Q',
        click: () => electron.app.quit(),
    },
    // {label: 'bookmarked'},
    // {label: 'history'},
    // {label: 'settings'},
];

// function to load a window
let load_window = async (html_page) => {
    // create a new window object
    const window = new electron.BrowserWindow({
        show: false,
        frame: false,
        width: 1250,
        height: 700,
        icon: './icons/mimi_reader.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    // maximize then unhide then load the specified html page *relative path*
    // window.maximize();
    await window.loadURL(path.join(__dirname, html_page));
    window.show();

    return window;
};

// function to swap the current main window to another html page
let swap_window = async (window, html_page) => {
    if (!window){
        throw `no existing window to navigate to ${html_page}`;
    }

    await window.loadURL(path.join(__dirname, html_page));
    return window;
};

// helper/main function to load the home window on ready and handle events
let load_home = async () => {
    let main_window = await load_window('main_window.html');

    const main_menu = electron.Menu.buildFromTemplate(main_menu_template);
    electron.Menu.setApplicationMenu(main_menu);
    
    // catching the search_key/data once its submitted from the search form
    electron.ipcMain.on('search_key', async (event, data) => {
        main_window = await swap_window(main_window, 'result_window.html');

        const manganelo_scraper = new scrapers.manganelo_scraper();
        await manganelo_scraper.search(data);
        await manganelo_scraper.close_browser();
        
        main_window.webContents.send('load_results', manganelo_scraper._results);

        // main_window.webContents.once('did-finish-load', () => {
        //     main_window.webContents.send('load_results', manganelo_scraper._results);
        // });
        // console.log(manganelo_scraper._results);
        // console.log(data);
    });

    // ribbon/navbar event handler receiving end
    electron.ipcMain.on('go_search', async (event, data) => {
        main_window = await swap_window(main_window, 'main_window.html');
    });

    electron.ipcMain.on('minimize', (event, data) => {
        main_window.minimize();
    });

    electron.ipcMain.on('maximize', (event, data) => {
        main_window.isMaximized() ? main_window.unmaximize() : main_window.maximize();
    });

    electron.ipcMain.on('close', (event, data) => {
        electron.app.quit();
    });

};

electron.app.on('ready', load_home);
