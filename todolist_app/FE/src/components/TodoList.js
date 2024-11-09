import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ 
  tasks, 
  onDeleteTask, 
  onToggleComplete, 
  editingTask,
  onStartEditing,
  editText,
  editDueDate,
  onEditTextChange,
  onEditDueDateChange,
  onSaveEdit,
  onCancelEdit
}) {
  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <li key={task.id}>
          <TodoItem 
            task={task} 
            onDelete={onDeleteTask}
            onToggleComplete={onToggleComplete}
            onStartEditing={onStartEditing}
            isEditing={editingTask?.id === task.id}
            editText={editText}
            editDueDate={editDueDate}
            onEditTextChange={onEditTextChange}
            onEditDueDateChange={onEditDueDateChange}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoList; 