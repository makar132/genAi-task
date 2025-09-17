
import React, { useState } from 'react';
import './App.css';
import NoteForm from './NoteForm';
import NotesList from './NotesList';

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes([
      ...notes,
      { ...note, id: Date.now() }
    ]);
  };

  const removeNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, ...updatedNote } : note)));
  };

  return (
    <div className="container py-4">
      <header className="mb-4 text-center">
        <h1 className="display-5">Notes App</h1>
        <span className="badge bg-primary fs-5">Total Notes: {notes.length}</span>
      </header>
      <NoteForm onSubmit={addNote} />
      <NotesList
        notes={notes}
        onDelete={removeNote}
        onEdit={updateNote}
      />
    </div>
  );
}

export default App;
