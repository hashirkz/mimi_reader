// fetch script for manganelo *readmanganato.com* searches

import fetch from 'node-fetch';

let read_data = function(path){
    __text = '';

    fetch(path)
        .then(__text.append(response));
    
    console.log(__text);
}

console.log(read_data('https://readmanganato.com/'));

