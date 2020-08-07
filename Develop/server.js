var fs = require("fs");
var myJson = require("./db/db.json")
let notes = [{}]

fs.writeFile("db/db.json", JSON.stringify(myJson), function (err) {
    if (err) throw (err)
    console.log('Saved File')
})

var express = require("express")
var path = require("path")

// This sets up the express application
var app = express()
var PORT = process.env.PORT || 3000

