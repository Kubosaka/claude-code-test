'use client'

interface Todo {
  id: number
  text: string
  completed: boolean
  priority: number
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdatePriority: (id: number, priority: number) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdatePriority }: TodoItemProps) {
  return (
    <div className="todo-item">
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.text}
      </span>
      <div className="priority-display">
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`star ${star <= todo.priority ? 'selected' : ''}`}
              onClick={() => onUpdatePriority(todo.id, star)}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => onToggle(todo.id)}
          className="toggle-button"
        >
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  )
}