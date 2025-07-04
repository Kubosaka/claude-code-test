'use client'

interface AddTodoFormProps {
  inputText: string
  setInputText: (text: string) => void
  priority: number
  setPriority: (priority: number) => void
  onAddTodo: () => void
}

export default function AddTodoForm({ inputText, setInputText, priority, setPriority, onAddTodo }: AddTodoFormProps) {
  return (
    <div className="todo-form">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter a new todo..."
        className="todo-input"
        onKeyPress={(e) => e.key === 'Enter' && onAddTodo()}
      />
      <div className="priority-selector">
        <label>Priority: </label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`star ${star <= priority ? 'selected' : ''}`}
              onClick={() => setPriority(star)}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <button onClick={onAddTodo} className="todo-button">
        Add Todo
      </button>
    </div>
  )
}