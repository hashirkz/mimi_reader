
{
    const { ipcRenderer } = require('electron');
    let navbar = document.querySelector('ul.navbar');
    // let [home, search, bookmarks] = [navbar.querySelector('li.tab[title="home"]'), navbar.querySelector('li.tab[title="search"]'), navbar.querySelector('li.tab[title="bookmarks"]')];
    let [home, search, bookmarks, min, max, close] = [
        navbar.querySelector('li.tab[title="home"]'), 
        navbar.querySelector('li.tab[title="search"]'), 
        navbar.querySelector('li.tab[title="bookmarks"]'),
        navbar.querySelector('li.tab[title="minimize"]'),
        navbar.querySelector('li.tab[title="maximize"]'),
        navbar.querySelector('li.tab[title="close"]'),
    ];

    // event listeners for navbar stuff
    home.onclick = () => {
        ipcRenderer.send('go_home', 0); 
    };
    
    min.onclick = () => {
        ipcRenderer.send('minimize', 0);
    };

    max.onclick = () => {
        ipcRenderer.send('maximize', 0);
    };

    close.onclick = () => {
        ipcRenderer.send('close', 0);
    };
}


