'use client'

import { useState, useEffect } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos')
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const addTodo = async () => {
    if (!inputText.trim()) return

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })
      
      if (response.ok) {
        setInputText('')
        fetchTodos()
      }
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        fetchTodos()
      }
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const toggleTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
      })
      
      if (response.ok) {
        fetchTodos()
      }
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  return (
    <div className="container">
      <h1>TODO App</h1>
      
      <div className="todo-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter a new todo..."
          className="todo-input"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} className="todo-button">
          Add Todo
        </button>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
              {todo.text}
            </span>
            <div className="todo-actions">
              <button
                onClick={() => toggleTodo(todo.id)}
                className="toggle-button"
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}