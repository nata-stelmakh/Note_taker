var fs =require("fs")
const uuidv1 = require("uuid/v1")

// var notebook = fs.readFileSync('./db/db.json','utf8')
// console.log(notebook)

class Storage{

getNotes(){
    var notebook = fs.readFileSync('./db/db.json','utf8')
    var jsonnotebook = JSON.parse(notebook)
    console.log("jsonnotebook",jsonnotebook)
    return jsonnotebook
};

addNote(note){
    var notebook = fs.readFileSync('./db/db.json','utf8')
    var jsonnotebook = JSON.parse(notebook)
    var {title,text} = note
    var newNote = {title,text,id:uuidv1()}
    var notes = [...jsonnotebook,newNote]
    var stringnotes = JSON.stringify(notes)
    fs.writeFileSync('./db/db.json',stringnotes)
    console.log(notes)
};
deleteNote(id){
    var notebook = fs.readFileSync('./db/db.json','utf8')
    var jsonnotebook = JSON.parse(notebook)
    var updatedNotes = jsonnotebook.filter((note)=> note.id!==id)
    var stringnotes = JSON.stringify(updatedNotes)
    fs.writeFileSync('./db/db.json',stringnotes)
}

}

module.exports = new Storage();