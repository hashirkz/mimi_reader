
{
    const { ipcRenderer } = require('electron');
    let navbar = document.querySelector('ul.navbar');
    // let [home, search, bookmarks] = [navbar.querySelector('li.tab[title="home"]'), navbar.querySelector('li.tab[title="search"]'), navbar.querySelector('li.tab[title="bookmarks"]')];
    let [home, search, bookmarks, min, max, close] = [
        navbar.querySelector('li.tab[title="home"]').firstChild, 
        navbar.querySelector('li.tab[title="search"]').firstChild, 
        navbar.querySelector('li.tab[title="bookmarks"]').firstChild,
        navbar.querySelector('li.tab[title="minimize"]').firstChild,
        navbar.querySelector('li.tab[title="maximize"]').firstChild,
        navbar.querySelector('li.tab[title="close"]').firstChild,
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