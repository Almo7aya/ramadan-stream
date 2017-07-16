/*global require, console*/
/*
With The Name Of God

_ Ali Almohaya (AKA Almo7aya) 21/May/1017 _
_ Hotspot Temp - stream server _
_ https://fb.com/Almo7aya _

*/

//init the varables

const express    = require('express');
const app        = express();
const path       = require('path');
const http       = require('http').createServer(app); 
const fs         = require('fs');
var os 			 = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

let port;
// read configers files

// get the file path form text file and set it as global var
let mainPath;
try {
	mainPath = fs.readFileSync("../path.txt", "utf8");
	app.locals.mainPath = mainPath;
	app.set('mainPath', mainPath);
	
	mainName = fs.readFileSync("../name.txt", "utf8");
	app.locals.name = mainName;
	
	
	mainPort = fs.readFileSync("../port.txt", "utf8");
	app.locals.port = mainPort;
	
	port = process.env.PORT || mainPort;
	
} catch (e) {
	console.log("error with the path.txt or name.txt file");
	process.exit();
}

// file reader
const controller = require('./lib/controller.js');
app.set('controller', controller);

function here() {
    let files = controller.init(mainPath);
    app.locals.files = files;
    app.set('files', files);
}

let files = controller.init(mainPath, here);
app.locals.files = files;
app.set('files', files);


// set the views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Init the meddleWare
app.use(express.static(path.join(__dirname, 'static')));

// set the routes

app.use(require("./routes/index"));
app.use(require("./routes/browser"));
app.use(require("./routes/viewer"));
app.use(require("./routes/streamer"));


//404 err
app.get('*', (req, res) => res.status(404).send('Not Found!'));
app.post('*', (req, res) => res.status(404).send('Not Found!'));


// listen to the port
app.listen(port, () => console.log(`Server is Running at -> http://${ addresses[0] + ':' + port }`));

