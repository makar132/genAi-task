
import { Card, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import './App.css';

function NotesList({ notes, onDelete, onEdit }) {
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    const startEdit = (note) => {
        setEditingId(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const handleEditSubmit = (e, id) => {
        e.preventDefault();
        onEdit(id, { title: editTitle, content: editContent });
        setEditingId(null);
    };

    return (
        <div className="container">
            <div className="row g-4">
                {notes.map(note => (
                    <div className="col-12 col-md-4" key={note.id}>
                        <Card>
                            <Card.Body>
                                {editingId === note.id ? (
                                    <form onSubmit={e => handleEditSubmit(e, note.id)}>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={editTitle}
                                            onChange={e => setEditTitle(e.target.value)}
                                            placeholder="Title"
                                            required
                                        />
                                        <textarea
                                            className="form-control mb-2"
                                            value={editContent}
                                            onChange={e => setEditContent(e.target.value)}
                                            placeholder="Content"
                                            required
                                        />
                                        <Button type="submit" variant="success" className="me-2">Save</Button>
                                        <Button variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                                    </form>
                                ) : (
                                    <>
                                        <Card.Title>{note.title}</Card.Title>
                                        <Card.Text>{note.content}</Card.Text>
                                        <Button variant="danger" onClick={() => onDelete(note.id)} className="me-2">Delete</Button>
                                        <Button
                                            variant="primary"
                                            onClick={() => startEdit(note)}
                                        >Edit</Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotesList;