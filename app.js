const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions =  {
        describe: 'Title of Note',
        demand: true,
        alias: 't'
};

const bodyOptions =  {
        describe: 'Text of note',
        demand: true,
        alias: 'b'
};

const argv = yargs
.command('add', 'Add a New Note', {
    title: titleOptions,
    body: bodyOptions
})
.command('list', 'List all notes', {})
.command('read', 'Reads note', {
  title: titleOptions,
})
.command('remove', 'removes note', {
  title: titleOptions
})
.help()
.argv;


var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('note created');
        notes.logNote(note);
    } else {
        console.log('Note title taken');
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes(s).`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    var note = notes.getNote(argv.title)
    if (note) {
        console.log("Note Found");
        notes.logNote(note);
    } else {
        console.log('Note not Found');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved
        ? 'Note was removed'
        : 'Note not found';
    console.log(message);
} else {
    console.log('Command not recognized');
}
