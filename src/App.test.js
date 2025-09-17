
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Notes App', () => {
  test('adds a valid note', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Note' } });
    fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Test Content' } });
    fireEvent.click(screen.getByText(/submit/i));
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText(/total notes: 1/i)).toBeInTheDocument();
  });

  test('does not add note with empty fields', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/submit/i));
    expect(screen.queryByText(/total notes: 1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/content is required/i)).toBeInTheDocument();
  });

  test('deletes a note', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Delete Me' } });
    fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'To be deleted' } });
    fireEvent.click(screen.getByText(/submit/i));
    // Find all delete buttons and click the first one
    const deleteButtons = screen.getAllByText(/delete/i, { selector: 'button' });
    fireEvent.click(deleteButtons[0]);
    expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
    expect(screen.getByText(/total notes: 0/i)).toBeInTheDocument();
  });

  test('edits a note', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Edit Me' } });
    fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Original Content' } });
    fireEvent.click(screen.getByText(/submit/i));
    // Find all edit buttons and click the first one
    const editButtons = screen.getAllByText(/edit/i, { selector: 'button' });
    fireEvent.click(editButtons[0]);
    fireEvent.change(screen.getByPlaceholderText(/title/i), { target: { value: 'Edited Title' } });
    fireEvent.change(screen.getByPlaceholderText(/content/i), { target: { value: 'Edited Content' } });
    fireEvent.click(screen.getByText(/save/i));
    expect(screen.getByText('Edited Title')).toBeInTheDocument();
    expect(screen.getByText('Edited Content')).toBeInTheDocument();
  });
});
