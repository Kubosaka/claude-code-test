'use client'

interface AddTodoFormProps {
  inputText: string
  setInputText: (text: string) => void
  onAddTodo: () => void
}

export default function AddTodoForm({ inputText, setInputText, onAddTodo }: AddTodoFormProps) {
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
      <button onClick={onAddTodo} className="todo-button">
        Add Todo
      </button>
    </div>
  )
}