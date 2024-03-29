{
    window.addEventListener('load', () => {
        const { ipcRenderer } = require('electron');
        let navbar = document.querySelector('ul.navbar');
    
        // unpacking navbar/ribbon ui into html elements to listen for events
        let [nav, search, bookmarks, min, max, close] = navbar.querySelectorAll('li.tab > img');
    
    
        // event listeners for navbar stuff
        nav.onclick = () => {
            const sidebar_wrapper = document.querySelector('.sidebar-wrapper');
            let x = getComputedStyle(sidebar_wrapper).getPropertyValue('--translate-x');

            sidebar_wrapper.style.setProperty('--translate-x', x == '0vw' ? '25vw': '0vw');

        };
        
        search.onclick = () => {
            ipcRenderer.send('go_search', 0)
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
    });
}