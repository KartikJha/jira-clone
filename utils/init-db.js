//require mongoose module
var mongoose = require('mongoose');

//require chalk module to give colors to console text
var chalk = require('chalk');
// const { migrate } = require('../db-migrations');

//require database URL from properties file
var dbURL = process.env.DB_URL || "mongodb://localhost:27017"

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//export this function and imported by server.js
module.exports =function(){

    mongoose.connect(dbURL);

    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to ", dbURL));
        // migrate({mongodb: {
        //     url: dbURL,
        //     options: { useNewUrlParser: true },
        // }})
    });

    mongoose.connection.on('error', function(err){
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
}