const btn = document.getElementById('btn');
const app = document.getElementById('app');

getNotes().forEach((note) => {
    const noteEl = createNoteElement(note.id, note.content);
    app.insertBefore(noteEl, btn);
})

btn.addEventListener('click', addNote);

function createNoteElement(id, content) {
    const element = document.createElement('textarea');
    element.classList.add('note');
    element.placeholder = 'Add note here';
    element.value = content;

    element.addEventListener('dblclick', () => {
        const warning = confirm('Would you like to delete this note?');
        if (warning) {
            deleteNote(id, element);
        }
    });

    element.addEventListener('input', () => {
        updateNote(id, element.value);
    });
    return element;
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);
    saveNote(notes);
    app.removeChild(element);
}

function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveNote(notes);
}

function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: ''
    };
    const noteElement = createNoteElement(noteObj.id, noteObj.content);
    app.insertBefore(noteElement, btn);

    notes.push(noteObj);

    saveNote(notes);
}

function saveNote(notes) {
    localStorage.setItem('note-app', JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem('note-app') || '[]');
}