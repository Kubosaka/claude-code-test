export const isValidTodoText = (text: string | null | undefined): boolean => {
  if (!text) return false
  return text.trim().length > 0 && text.length <= 255
}

export const formatTodos = (dbTodos: any[]) => {
  return dbTodos.map(todo => ({
    id: todo.id,
    text: todo.text,
    completed: Boolean(todo.completed),
  }))
}