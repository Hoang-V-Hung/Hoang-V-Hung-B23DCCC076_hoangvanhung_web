import React from 'react';
import './style.css';

const ToDoItem = ({ title, dueDate, completed, onDelete, onToggle }) => {
    const dueDateObj = new Date(dueDate);
    const today = new Date();
    const timeDifference = Math.ceil((dueDateObj - today) / (1000 * 60 * 60 * 24));

    const formattedDate = dueDateObj.toLocaleDateString();
    const dueDateStyle = {
        color: timeDifference <= 2 ? 'red' : 'red',
        fontWeight: timeDifference <= 2 ? 'normal' : 'normal',
        fontSize: timeDifference <= 2 ? '16px' : '14px',
    };

    return (
      <div className={`ToDoItem ${completed ? 'completed' : ''}`}>
        <input type="checkbox" checked={completed} onChange={onToggle} />
        <div className="ItemContent">
          <p className="Title">{title}</p>
          <p className="DueDate" style={dueDateStyle}>{formattedDate}</p>
        </div>
        <div className="Action">
          <button onClick={onDelete}>Xoá</button>
        </div>
      </div>
    );
};

export default ToDoItem;