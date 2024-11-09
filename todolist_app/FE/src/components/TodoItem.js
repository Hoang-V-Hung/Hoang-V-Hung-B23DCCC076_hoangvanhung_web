import React from 'react';

function TodoItem({ 
  task, 
  onDelete, 
  onToggleComplete, 
  onStartEditing,
  isEditing,
  editText,
  editDueDate,
  onEditTextChange,
  onEditDueDateChange,
  onSaveEdit,
  onCancelEdit
}) {
  if (isEditing) {
    return (
      <div className="todo-item">
        <div className="todo-content">
          <input
            type="text"
            value={editText}
            onChange={(e) => onEditTextChange(e.target.value)}
            className="edit-input"
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => onEditDueDateChange(e.target.value)}
            className="edit-date"
          />
          <div className="edit-buttons">
            <button onClick={onSaveEdit} className="save-btn">Lưu</button>
            <button onClick={onCancelEdit} className="cancel-btn">Huỷ</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={task.completed || false}
          onChange={() => onToggleComplete(task.id, task.completed)}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <span className="due-date">
            {new Date(task.due_date).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => onStartEditing(task)} className="edit-btn">Sửa</button>
        <button onClick={() => onDelete(task.id)} className="delete-btn">Xoá</button>
      </div>
    </div>
  );
}

export default TodoItem; 