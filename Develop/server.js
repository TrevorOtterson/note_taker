let fs = require("fs");
let myJson = require("./db/db.json")
// empty object array to push in new note data
let notes = [{}]

// writes file into the db.json
fs.writeFile("db/db.json", JSON.stringify(myJson), function (err) {
    if (err) throw (err)
    console.log('Saved File')
})

// pulls the information from the dependencies in package.json
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
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});
app.get("/assets/js/index.js", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"))
});
app.get("/assets/css/styles.css", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"))
});

// API link
// displays all notes
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err
        let notes = JSON.parse(data)
        return res.json(notes)
    })
});

// posts data to the notes in the REST API
app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err
        let notes = JSON.parse(data)
        let new_notes = req.body
        // pushes new_notes into notes object array
        new_notes.id = new_notes.title
        notes.push(new_notes)

        // writes file into db.json
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (err, data) {
            if (err) throw err
            console.log(new_notes)
            res.json(new_notes)
        })
    })
})

// gives each note a unique `id` when it's saved, and deletes notes with given `id` on command
app.delete("/api/notes/:id", function (req, res) {
    // uses params to create individual note `id`
    let note_id = req.params.id
    // collects notes from the db
    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err
        let notes = JSON.parse(data)
        let note_filter = notes.filter((note) => {return note.id !== note_id})
        
        // writes new note data into db.json
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(note_filter), function (err, data) {
            if (err) throw err
        })
    })
})
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});