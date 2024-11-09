import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

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
        fetchTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const task = tasks.find(t => t.id === id);
      await axios.put(`/api/todos/${id}`, {
        title: task.title,
        description: task.description || '',
        due_date: task.due_date,
        completed: !completed
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setEditText(task.title);
    setEditDueDate(task.due_date);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditText('');
    setEditDueDate('');
  };

  const saveEdit = async () => {
    if (editingTask && editText) {
      try {
        await axios.put(`/api/todos/${editingTask.id}`, {
          title: editText,
          description: editingTask.description || '',
          due_date: editDueDate,
          completed: editingTask.completed || false
        });
        setEditingTask(null);
        setEditText('');
        setEditDueDate('');
        fetchTasks();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>My work 🎯</h1>
      <TodoList 
        tasks={tasks} 
        onDeleteTask={deleteTask}
        onToggleComplete={toggleComplete}
        editingTask={editingTask}
        onStartEditing={startEditing}
        editText={editText}
        editDueDate={editDueDate}
        onEditTextChange={setEditText}
        onEditDueDateChange={setEditDueDate}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEditing}
      />
      <div className="add-task">
        <input
          type="text"
          placeholder="Thêm task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Thêm task</button>
      </div>
    </div>
  );
}

export default App;