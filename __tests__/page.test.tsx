import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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

  it('renders the todo app title', () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })

    render(<Home />)
    expect(screen.getByText('TODO App')).toBeInTheDocument()
  })

  it('renders input field and add button', () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })

    render(<Home />)
    expect(screen.getByPlaceholderText('Enter a new todo...')).toBeInTheDocument()
    expect(screen.getByText('Add Todo')).toBeInTheDocument()
  })

  it('fetches todos on mount', async () => {
    const mockTodos = [
      { id: 1, text: 'Test todo', completed: false },
      { id: 2, text: 'Another todo', completed: true },
    ]

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    })

    render(<Home />)

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
        json: async () => [{ id: 1, text: 'New todo', completed: false }],
      })

    render(<Home />)

    const input = screen.getByPlaceholderText('Enter a new todo...')
    const addButton = screen.getByText('Add Todo')

    fireEvent.change(input, { target: { value: 'New todo' } })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: 'New todo' }),
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

    render(<Home />)

    const addButton = screen.getByText('Add Todo')
    fireEvent.click(addButton)

    // Should only be called once for initial fetch, not for adding empty todo
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('toggles todo completion', async () => {
    const mockTodos = [
      { id: 1, text: 'Test todo', completed: false },
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
        json: async () => [{ id: 1, text: 'Test todo', completed: true }],
      })

    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Test todo')).toBeInTheDocument()
    })

    const completeButton = screen.getByText('Complete')
    fireEvent.click(completeButton)

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/api/todos/1', {
        method: 'PUT',
      })
    })
  })

  it('deletes todo', async () => {
    const mockTodos = [
      { id: 1, text: 'Test todo', completed: false },
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

    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Test todo')).toBeInTheDocument()
    })

    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/api/todos/1', {
        method: 'DELETE',
      })
    })
  })
})