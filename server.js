const express = require('express');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require("mongoose");
const db = require("./config/keys");

// Router
const shopRouter = require("./routes/api/shops");
const songRouter = require("./routes/api/songs");


app.set('port', process.env.PORT || 5000);

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to MongoDB
mongoose
  .connect(db, { autoIndex: false, useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use("/shops", shopRouter);
app.use("/songs", songRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });    
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('HttpServer starting  : ' + 'PORT=' + app.get('port'));
});
