let fs = require("fs");
let myJson = require("./db/db.json")
let notes = [{}]

fs.writeFile("db/db.json", JSON.stringify(myJson), function (err) {
    if (err) throw (err)
    console.log('Saved File')
})

let express = require("express")
let path = require("path")

// Sets up the express application
let app = express()
let PORT = process.env.PORT || 3000

// Sets up the Express application to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Links all the files to the server.js file
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/assets/js/index.js", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

app.get("/assets/css/styles.css", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});