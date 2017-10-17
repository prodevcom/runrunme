var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var sequelize = require('sequelize');
const Op = sequelize.Op;

var connection = new sequelize(
    'database',
    'root',
    '', {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);
module.exports = function () {
    var app = express();
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.set('connection', connection);
    app.set('Op', Op);
    consign()
        .include('controllers')
        .then('models')
        .into(app);
    require('./routes')(app);

    return app;
};