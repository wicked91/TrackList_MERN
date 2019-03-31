var mongoose = require('mongoose');
var db_url = require('../config/db_url').db_url;
var database = {};

database.init = function (app, config) {
    console.log('database starting');
    connect(app, config);
}

function connect(app, config) {
    
    mongoose.Promise = global.Promise;
    mongoose.set('useCreateIndex', true);
    mongoose.connect(db_url, { useNewUrlParser: true });
    database.db = mongoose.connection;

    database.db.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.db.on('open', function () {
        console.log('database connect');
        createSchemas(app, config);
    });
    database.db.on('disconnected', connect);
}

function createSchemas(app, config) {

    var schemaLen = config.db_schemas.length;
    console.log('db_schemas length : ' + schemaLen);

    for (var i = 0; i < schemaLen; i++) {
        var curItem = config.db_schemas[i];
        var curSchema = require(curItem.file).createSchema(mongoose);
        var curModel = mongoose.model(curItem.collection, curSchema);

        database[curItem.schemaName] = curSchema;
        database[curItem.modelName] = curModel;
        console.log('SchemaName : [%s], ModelName : [%s] SET', curItem.schemaName, curItem.modelName);
    }

    app.set('database', database);
}

module.exports = database;
