var express = require('express'),
    http = require('http'),
    path = require('path');

var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser')

var expressSession = require('express-session');
    
var app = express();

//************************Modules************************
var config = require('./config/config');
var route_loader = require('./routes/route_loader');
var database = require('./database/database');

//************************Setting************************
app.set('port', process.env.PORT || config.server_port);

//************************middleware************************

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'MYSIGN',
    resave: true,
    saveUninitialized: true
}));

route_loader.init(app, express.Router());
database.init(app, config);
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//************************Server************************
http.createServer(app).listen(app.get('port'), function () {

    console.log('HttpServer starting  : ' + 'PORT=' + app.get('port'));
});
