import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NoteForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required.';
        if (!content.trim()) newErrors.content = 'Content is required.';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        // Call parent handler to add note
        if (onSubmit) {
            onSubmit({ title, content });
        }
        // Clear the form fields after submission
        setTitle('');
        setContent('');
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea
                    className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                    id="content"
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                {errors.content && <div className="invalid-feedback">{errors.content}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default NoteForm;