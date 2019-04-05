const express = require('express');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');


const app = express();
//************************Modules************************
const config = require('./config/config');
const route_loader = require('./routes/route_loader');
const database = require('./database/database');

//************************Setting************************
app.set('port', process.env.PORT || config.server_port);

//************************middleware************************

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(morgan('common'));
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
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//************************Server************************
http.createServer(app).listen(app.get('port'), function () {
    console.log('HttpServer starting  : ' + 'PORT=' + app.get('port'));
});
