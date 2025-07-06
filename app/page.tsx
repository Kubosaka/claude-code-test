'use client'

import { useState, useEffect } from 'react'
import AddTodoForm from '../components/AddTodoForm'
import TodoList from '../components/TodoList'

interface Todo {
  id: number
  text: string
  completed: boolean
  priority: number
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [priority, setPriority] = useState(1)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos')
      const data = await response.json()
      setTodos(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching todos:', error)
      setTodos([])
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
        body: JSON.stringify({ text: inputText, priority }),
      })
      
      if (response.ok) {
        setInputText('')
        setPriority(1)
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

  const updatePriority = async (id: number, newPriority: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priority: newPriority }),
      })
      
      if (response.ok) {
        fetchTodos()
      }
    } catch (error) {
      console.error('Error updating priority:', error)
    }
  }

  return (
    <div className="container">
      <h1>TODO App</h1>
      
      <AddTodoForm
        inputText={inputText}
        setInputText={setInputText}
        priority={priority}
        setPriority={setPriority}
        onAddTodo={addTodo}
      />

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdatePriority={updatePriority}
      />
    </div>
  )
}