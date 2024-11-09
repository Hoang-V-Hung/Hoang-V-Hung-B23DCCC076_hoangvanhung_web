const db = require('../configs/database');

const Todo = {
    getAll: (callback) => {
        db.query('SELECT *, CAST(completed AS UNSIGNED) as completed FROM todos', callback);
    },
    create: (title, description, due_date, callback) => {
        db.query(
            'INSERT INTO todos (title, description, due_date, completed) VALUES (?, ?, ?, 0)', 
            [title, description, due_date], 
            callback
        );
    },
    update: (id, title, description, due_date, completed, callback) => {
        const completedValue = completed ? 1 : 0;
        db.query(
            'UPDATE todos SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?',
            [title, description, due_date, completedValue, id],
            callback
        );
    },
    delete: (id, callback) => {
        db.query('DELETE FROM todos WHERE id = ?', [id], callback);
    }
};

module.exports = Todo;