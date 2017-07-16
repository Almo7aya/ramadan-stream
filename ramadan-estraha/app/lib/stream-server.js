/*
    Ali Almohaya
    stream server lib
    16/4/2017

    stream any kind of data and reshare it with the server 
 */


const fs = require('fs');

function streamData(path) {

    // //get the file 

    let files = this.files,
        res   = this.res,
        req   = this.req,
		cenFile = this.cenFile;
    // target the object
    let target;
    //loop throw the object and get the object
	
	
	 let pass = true;
		  
	 files.forEach( file => { 
		  
		if ( file.name === cenFile ) { 
		  	
		  	target = file; return false;
		  	
	    } else if ( file.type === "dir" ) { 
		  		
		  	file.childer.forEach( file => { 
		  
		  	if ( file.name === cenFile ) { 
		  	
		  		target = file; return false; 
		  	
		  	 } else if ( file.type === "dir" ) { 
		  	
		  		file.childer.forEach( file => { 
		  
		  		 if ( file.name === cenFile ) { 
		  	
		  			 target = file; return false;
		  	
		  		 } else if ( file.type === "dir" ) { 
		  	
		  			file.childer.forEach( file => { 
		  
		  				if ( file.name === cenFile ) { 
		  	
		  					target = file; return false;
		  	
		  				} else { 
		  							
		  				 } 
		  
		  			});
		  	
		  		 } 
		  
		  	}); 
		  	
		   } 
		  
		 }); 
		  
		} 
		  
	});
		  
		   
	if ( !target ) {
		 return res.writeHead(404);
	}

    //get the stat of the file 
    fs.stat(target.path, function (err, stat) {

    if (err) {
    //if the status code == ENOENT // NOT FOUND
        if (err.code === 'ENOENT') {
        //file Not Found
            return res.writeHead(404);
        }
    //If uknown err stop the res and send the err
        res.end(err);
    }

    //init the varables
    let total  = stat.size,
    range  = req.headers.range,
    stream = fs.createReadStream(target.path);


    if (!range) {
    //if range not found
    //send success message
        res.writeHead(200, {
        "Content-Length": total,
        "Accept-Ranegs": "bytes",
        "Content-Type": target.mime
    });
    //start stream
        return stream.pipe(res);
    }

    //get the infos from the request headers
    let position  = range.replace(/bytes=/, '').split('-'),
    //get the start point from the request headers
    start     = parseInt(position[0], 10),
    //get the end point from the request headers if end not exsist set it as the total
    end       = position[1] ? parseInt(position[1], 10) : total - 1,
    //set the chunkSize the full length - the passed size
    chunkSize = (end - start) + 1;


    // Start write the response header fildes
    // Partial Content
    res.writeHead(206, {

    "Content-Range": "bytes " + start + "-" + end + "/" + total, //bytes 17694720-116925384/116925385
    "Accept-Ranegs": "bytes",
    "Content-Length": chunkSize,
    "Content-Type": target.mime, // note that have to change for every deffrent extend
    "Transfer-Encoding": "chunked"

    });
     
    try {
        //start The streaming Form the target file
        stream = fs.createReadStream(target.path, {
                start: start,
                end: end
            }).on('open', function () { //on the stream open and get data
                stream.pipe(res);//pipe the data to the res
            }).on('error', function (err) { //on the stream gets an err
                throw err;
            });

    } catch (s) { // if err start must be => end
        //start The streaming Form the target file

        console.log('We got an err');

        fs.stat(target.path, () => {

            if (err) {
                 //if the status code == ENOENT // NOT FOUND
                if (err.code === 'ENOENT') {
                //file Not Found
                    return res.writeHead(404);
                }
                //If uknown err stop the res and send the err
                res.end(err);
            }
            //start The streaming Form the target file
            stream = fs.createReadStream(target.path, {
                start: 0,
                end: 1
            })
            .on('open', function () { //on the stream open and get data
                stream.pipe(res);//pipe the data to the res
            }).on('error', function (err) { //on the stream gets an err
                throw err;
            });

        // end catch stat
        });
    //end catch
    }
    //end main stat
    });

//end function
}


module.exports = streamData;
