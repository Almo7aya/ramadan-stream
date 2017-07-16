const express    = require('express');
const app        = express();
const router     = express.Router();
const str        = require("../lib/stream-server");

function getSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

function makeArray(obj) {
    var array = [], key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) array.push(obj[key]);
    }
    return array;
}


router.get('/streamer', (req, res) => {
    'use strict';

    let query = req.query;
	
	
	let obj = {
		files: req.app.get("files"),
		req: req,
		res: res,
		cenFile: query['file' + getSize(query)]
	};
	
	str.call(obj, query);
	
	
 });


module.exports = router;
