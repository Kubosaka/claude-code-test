'use client'

import TodoItem from './TodoItem'

interface Todo {
  id: number
  text: string
  completed: boolean
  priority: number
}

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdatePriority: (id: number, priority: number) => void
}

export default function TodoList({ todos, onToggle, onDelete, onUpdatePriority }: TodoListProps) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdatePriority={onUpdatePriority}
        />
      ))}
    </div>
  )
}