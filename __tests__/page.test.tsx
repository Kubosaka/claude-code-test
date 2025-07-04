import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import Home from '../app/page'

// Mock fetch globally
global.fetch = jest.fn()

describe('Todo App', () => {
  let fetchSpy: jest.SpyInstance

  beforeEach(() => {
    fetchSpy = global.fetch as jest.MockedFunction<typeof fetch>
    fetchSpy.mockClear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the todo app title', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })

    await act(async () => {
      render(<Home />)
    })
    
    expect(screen.getByText('TODO App')).toBeInTheDocument()
  })

  it('renders input field and add button', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })

    await act(async () => {
      render(<Home />)
    })
    
    expect(screen.getByPlaceholderText('Enter a new todo...')).toBeInTheDocument()
    expect(screen.getByText('Add Todo')).toBeInTheDocument()
  })

  it('fetches todos on mount', async () => {
    const mockTodos = [
      { id: 1, text: 'Test todo', completed: false, priority: 1 },
      { id: 2, text: 'Another todo', completed: true, priority: 2 },
    ]

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    })

    await act(async () => {
      render(<Home />)
    })

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/todos')
    })

    expect(screen.getByText('Test todo')).toBeInTheDocument()
    expect(screen.getByText('Another todo')).toBeInTheDocument()
  })

  it('adds a new todo when form is submitted', async () => {
    fetchSpy
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => {},
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, text: 'New todo', completed: false, priority: 1 }],
      })

    await act(async () => {
      render(<Home />)
    })

    const input = screen.getByPlaceholderText('Enter a new todo...')
    const addButton = screen.getByText('Add Todo')

    await act(async () => {
      fireEvent.change(input, { target: { value: 'New todo' } })
      fireEvent.click(addButton)
    })

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: 'New todo', priority: 1 }),
      })
    })

    // Assert that the new todo appears in the UI
    await waitFor(() => {
      expect(screen.getByText('New todo')).toBeInTheDocument()
    })
  })

  it('does not add empty todo', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })

    await act(async () => {
      render(<Home />)
    })

    const addButton = screen.getByText('Add Todo')
    
    await act(async () => {
      fireEvent.click(addButton)
    })

    // Should only be called once for initial fetch, not for adding empty todo
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('toggles todo completion', async () => {
    const mockTodos = [
      { id: 1, text: 'Test todo', completed: false, priority: 1 },
    ]

    fetchSpy
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTodos,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => {},
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, text: 'Test todo', completed: true, priority: 1 }],
      })

    await act(async () => {
      render(<Home />)
    })

    await waitFor(() => {
      expect(screen.getByText('Test todo')).toBeInTheDocument()
    })

    const completeButton = screen.getByText('Complete')
    
    await act(async () => {
      fireEvent.click(completeButton)
    })

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/api/todos/1', {
        method: 'PUT',
      })
    })

    // Verify UI reflects the updated completion state
    await waitFor(() => {
      expect(screen.getByText('Undo')).toBeInTheDocument()
    })
  })

  it('deletes todo', async () => {
    const mockTodos = [
      { id: 1, text: 'Test todo', completed: false, priority: 1 },
    ]

    fetchSpy
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTodos,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => {},
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })

    await act(async () => {
      render(<Home />)
    })

    await waitFor(() => {
      expect(screen.getByText('Test todo')).toBeInTheDocument()
    })

    const deleteButton = screen.getByText('Delete')
    
    await act(async () => {
      fireEvent.click(deleteButton)
    })

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/api/todos/1', {
        method: 'DELETE',
      })
    })

    // Verify the todo item is no longer present in the DOM
    await waitFor(() => {
      expect(screen.queryByText('Test todo')).not.toBeInTheDocument()
    })
  })
})