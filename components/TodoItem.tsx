'use client'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="todo-item">
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.text}
      </span>
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