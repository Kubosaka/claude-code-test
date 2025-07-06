'use client'

import { useState, useEffect } from 'react'
import AddTodoForm from '../components/AddTodoForm'
import TodoList from '../components/TodoList'

interface Todo {
  id: number
  text: string
  completed: boolean
  priority: number
  created_at: string
}

interface DateSummary {
  date: string
  count: number
  completed_count: number
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [priority, setPriority] = useState(1)
  const [dateSummaries, setDateSummaries] = useState<DateSummary[]>([])
  const [selectedDate, setSelectedDate] = useState<string>('')

  useEffect(() => {
    fetchTodos()
    fetchDateSummaries()
  }, [])

  const fetchTodos = async (date?: string) => {
    try {
      const url = date ? `/api/todos?date=${date}` : '/api/todos'
      const response = await fetch(url)
      const data = await response.json()
      setTodos(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching todos:', error)
      setTodos([])
    }
  }

  const fetchDateSummaries = async () => {
    try {
      const response = await fetch('/api/todos/dates')
      const data = await response.json()
      setDateSummaries(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching date summaries:', error)
      setDateSummaries([])
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
        fetchTodos(selectedDate)
        fetchDateSummaries()
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
        fetchTodos(selectedDate)
        fetchDateSummaries()
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
        fetchTodos(selectedDate)
        fetchDateSummaries()
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
        fetchTodos(selectedDate)
        fetchDateSummaries()
      }
    } catch (error) {
      console.error('Error updating priority:', error)
    }
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    fetchTodos(date)
  }

  const handleShowAll = () => {
    setSelectedDate('')
    fetchTodos()
  }

  return (
    <div className="container">
      <h1>TODO App</h1>
      
      <div className="date-selector">
        <button 
          onClick={handleShowAll}
          className={selectedDate === '' ? 'active' : ''}
        >
          すべて
        </button>
        {dateSummaries.map((summary) => (
          <button
            key={summary.date}
            onClick={() => handleDateSelect(summary.date)}
            className={selectedDate === summary.date ? 'active' : ''}
          >
            {new Date(summary.date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')} ({summary.completed_count}/{summary.count})
          </button>
        ))}
      </div>

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