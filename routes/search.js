var http = require('http');
var parseString = require('xml2js').parseString;
var urlencode = require('urlencode');

var search = function (req, res) {
    
    var paramSong = urlencode(req.params.title);
    var url = `http://www.maniadb.com/api/search/${paramSong}?sr=song&display=20&key=example&v=0.5`;
    console.log('[search][Request Parameter] : ' + paramSong);
    
    xmlToJson(url, function (err, data) {
        if (err) {
            return console.err(err);
        }
    
        var jdata = JSON.stringify(data);
        var myObject = JSON.parse(jdata);
        var list = myObject.rss.channel[0].item; 

        res.send(list);
    });
};

function xmlToJson(url, callback) {
    var req = http.get(url, function (res) {
        var xml = '';

        res.on('data', function (chunk) {
            xml += chunk;
        });

        res.on('error', function (e) {
            callback(e, null);
        });

        res.on('timeout', function (e) {
            callback(e, null);
        });

        res.on('end', function () {
            parseString(xml, function (err, result) {
                callback(null, result);
            });
        });
    });
}

module.exports.search = search;