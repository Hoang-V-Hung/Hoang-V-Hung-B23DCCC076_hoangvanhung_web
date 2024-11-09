import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask && dueDate) {
      try {
        await axios.post('/api/todos', {
          title: newTask,
          description: '',
          due_date: dueDate
        });
        setNewTask('');
        setDueDate('');
        fetchTasks(); // Refresh the list
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      fetchTasks(); // Refresh the list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <h1>My work 🎯</h1>
      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className="todo-item">
            <span>{task.title}</span>
            <span className="due-date">{new Date(task.due_date).toLocaleDateString()}</span>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add task</button>
      </div>
    </div>
  );
}

export default App;