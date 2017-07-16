const express    = require('express');
const app        = express();
const router     = express.Router();


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

router.get('/viewer/', (req, res) => {
    'use strict';

    let query = req.query;

    let cenFile = query['file' + getSize(query)];

    res.render('viewer',
        {
            size: getSize(query),
            filesList: query,
            cenFile: cenFile,
            pathList: makeArray(query)
        }
    );
    
});

module.exports = router;
