/**
 * Validates todo text input to ensure it meets requirements
 * @param text - The todo text to validate (can be null or undefined)
 * @returns true if the text is valid, false otherwise
 * 
 * Rules:
 * - Must not be null, undefined, or empty
 * - Must have content after trimming whitespace
 * - Trimmed length must not exceed 255 characters
 */
export const isValidTodoText = (text: string | null | undefined): boolean => {
  if (!text) return false
  const trimmedLength = text.trim().length
  return trimmedLength > 0 && trimmedLength <= 255
}

/**
 * Formats database todo records for client consumption
 * @param dbTodos - Array of todo records from the database
 * @returns Array of formatted todo objects with boolean completed field
 * 
 * Transforms database records by:
 * - Converting completed field from number/truthy to boolean
 * - Extracting only needed fields (id, text, completed)
 */
export const formatTodos = (dbTodos: any[]) => {
  return dbTodos.map(todo => ({
    id: todo.id,
    text: todo.text,
    completed: Boolean(todo.completed),
  }))
}