const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/', (req, res) => {
    Todo.getAll((err, results) => {
        if (err) {
            console.error('Error getting todos:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { title, description, due_date } = req.body;
    Todo.create(title, description, due_date, (err, result) => {
        if (err) {
            console.error('Error creating todo:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(201).json({ id: result.insertId });
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, due_date, completed } = req.body;
    
    // Log để debug
    console.log('Updating todo:', { id, title, description, due_date, completed });
    
    Todo.update(id, title, description, due_date, completed, (err, result) => {
        if (err) {
            console.error('Error updating todo:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        res.json({ message: 'Todo updated successfully' });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Todo.delete(id, (err, result) => {
        if (err) {
            console.error('Error deleting todo:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        res.json({ message: 'Todo deleted successfully' });
    });
});

module.exports = router; 