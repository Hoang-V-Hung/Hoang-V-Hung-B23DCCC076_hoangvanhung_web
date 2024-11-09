import React from 'react';
import './App.css';
import ToDoList from './ToDoList';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider>
      <div className="App">
        <h1>Todo App</h1>
        <ToDoList />
      </div>
    </ConfigProvider>
  );
}

export default App;