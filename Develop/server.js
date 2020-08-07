let fs = require("fs");
let myJson = require("./db/db.json")
let notes = [{}]

fs.writeFile("db/db.json", JSON.stringify(myJson), function(err) {
    if (err) throw (err)
    console.log('Saved File')
})

let express = require("express")
let path = require("path")

// Sets up the express application
let app = express()
let PORT = process.env.PORT || 3000

// Sets up the Express application to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Links all the files to the server.js file
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});
app.get("/assets/css/styles.css", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

// api link
app.get("/api/notes", function(req, res) {
    fs.readFile(__dirname + "/db/db.json", function(err,data) {
    if (err) throw (err)
    let notes = JSON.parse(data)
    return res.json(notes)
    })
});

app.post("/api/characters", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newCharacter = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newCharacter);

    characters.push(newCharacter);

    res.json(newCharacter);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});