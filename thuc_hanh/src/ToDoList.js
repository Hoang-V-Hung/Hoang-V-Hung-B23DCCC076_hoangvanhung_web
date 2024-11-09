import React, { useState } from 'react'; 
import ToDoItem from './ToDoItem';

const ToDoList = () => {
    const [tasks, setTasks] = useState([
        { title: "Học lập trình web với React", dueDate: "2024-10-13", completed: false },
        { title: "Gửi email nộp bài tập về nhà", dueDate: "2024-10-10", completed: false },
        { title: "Học từ vựng tiếng anh mỗi ngày", dueDate: "2024-10-11", completed: false },
        { title: "Viết tiểu luận môn Triết học", dueDate: "2024-10-12", completed: false }
    ]);
    const [newTask, setNewTask] = useState("");
    const [newDueDate, setNewDueDate] = useState("");

    const handleAddTask = () => {
        if (newTask && newDueDate) {
            const task = { title: newTask, dueDate: newDueDate, completed: false };
            setTasks([...tasks, task]);
            setNewTask("");
            setNewDueDate("");
        }
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(updatedTasks);
    };

    const handleToggleTask = (index) => {
        const updatedTasks = tasks.map((task, taskIndex) =>
            taskIndex === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="ToDoList" style={{ marginLeft: '10px' }}>
            <h2 style={{ marginLeft: '20px' }}>My work 🎯</h2>
            {tasks.length === 0 ? (
                <p style={{ marginLeft: '20px' }}>Không có nhiệm vụ nào.Thêm nhiệm vụ bên dưới !</p>
            ) : (
                <div>
                    {tasks.map((task, index) => (
                        <ToDoItem 
                            key={index} 
                            title={task.title} 
                            dueDate={task.dueDate} 
                            completed={task.completed} 
                            onDelete={() => handleDeleteTask(index)} 
                            onToggle={() => handleToggleTask(index)} 
                        />
                    ))}
                </div>
            )}

            <div style={{ marginTop: '5px', display: 'flex' }}>

              <button 
                    onClick={handleAddTask} 
                    style={{ 
                        fontSize: '20px', 
                        color: '#d1453b', 
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        padding: '0',
                        marginLeft: '20px',
                        marginRight: '10px'
                    }}
                >
                    +
              </button>

              <input 
                  type="text" 
                  value={newTask} 
                  onChange={(e) => setNewTask(e.target.value)} 
                  placeholder="Thêm nhiệm vụ" 
                  style={{ marginRight: '10px',border:'none ' }}
              />
              <input 
                  type="date" 
                  value={newDueDate} 
                  onChange={(e) => setNewDueDate(e.target.value)} 
                  style={{ marginRight: '10px' }}
              />
                
            </div>
        </div>
    );
};

export default ToDoList;