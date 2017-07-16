/*
    Ali Almohaya
    16/4/2017 / last edit  21/5/2017
    file reader

    search inside a gavin dir and get all files in array

*/

const fs = require('fs');
const path = require('path');
const mimeFile = require('./../data/mime-files');


//readdirSync 
function dirReaderSync(dir, fn) { //function to call when any fir is chnge
    //the result file
    let result = [];

    //check if the dir is passed
    if (!dir) {
        throw new TypeError('Please pass a valid dir');
        return null;
    }

    // get the list of files
    let list = fs.readdirSync(dir);

    //loop throw them
    list.forEach( file => {
        //init the file or dir name wite full path
		
		
         let fileWithPath = dir + '\\' + file;
		
        //and the result file
        let item = {
            path: fileWithPath,
            name: file
        }
        //get the file stat
        let stat = fs.statSync(fileWithPath);

        //check if the item is file or dir
        if (stat.isDirectory()) {

            item.type = 'dir';
            //The files inside it
            item.childer = dirReaderSync(fileWithPath);
            //recall the function and get the files the same way


            //if it dir set a watcher on it 
            fs.watch(item.path, fn)
            //if the dir deleted just ignore
            .on('error', () => null);
            


        } else {
            //if it not dir

            item.size = stat.size;

            item.extname = path.extname(fileWithPath);

            if (path.extname(fileWithPath).match(/jpg/gi) || path.extname(fileWithPath).match(/png/gi))
                item.type = 'img';
            else if (path.extname(fileWithPath).match(/pdf/gi))
                item.type = 'pdf';
            else if (path.extname(fileWithPath).match(/mp3/gi))
                item.type = 'audio'
            else if (path.extname(fileWithPath).match(/mp4/gi) || path.extname(fileWithPath).match(/3gp/gi) || path.extname(fileWithPath).match(/mkv/gi)|| path.extname(fileWithPath).match(/flv/gi) )
                item.type = 'video';


            

            //set the file extname
            let mime = path.extname(fileWithPath);
            let naMime = mimeFile[mime.toLowerCase()];
            // if the mime not found set it to the */*
            if (naMime === undefined)
                item.mime = '*/*';
            else
                item.mime = naMime;


        }
        //push the new items
        result.push(item);

    //end of forEach
    });

    //return the result
    return result;

//end of the function
}

module.exports = {
    dirReaderSync: dirReaderSync
};
