/**
 * @jest-environment node
 */

import { isValidTodoText, formatTodos } from '../utils/validation'

describe('Validation Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('isValidTodoText', () => {
    it('should validate input data correctly', () => {
      expect(isValidTodoText('')).toBe(false)
      expect(isValidTodoText('   ')).toBe(false)
      expect(isValidTodoText('Valid todo')).toBe(true)
      expect(isValidTodoText('a'.repeat(256))).toBe(false)
      expect(isValidTodoText(null)).toBe(false)
      expect(isValidTodoText(undefined)).toBe(false)
    })

    it('should handle edge cases', () => {
      expect(isValidTodoText('a')).toBe(true) // Single character
      expect(isValidTodoText('a'.repeat(255))).toBe(true) // Max length
      expect(isValidTodoText('  valid text  ')).toBe(true) // Trimmed spaces
    })
  })

  describe('formatTodos', () => {
    it('should format database response correctly', () => {
      const dbResponse = [
        { id: 1, text: 'Test', completed: 0, created_at: new Date() },
        { id: 2, text: 'Test 2', completed: 1, created_at: new Date() },
      ]

      const formatted = formatTodos(dbResponse)
      
      expect(formatted).toEqual([
        { id: 1, text: 'Test', completed: false },
        { id: 2, text: 'Test 2', completed: true },
      ])
    })

    it('should handle empty array', () => {
      const formatted = formatTodos([])
      expect(formatted).toEqual([])
    })

    it('should handle various completed values', () => {
      const dbResponse = [
        { id: 1, text: 'Test 1', completed: 0 },
        { id: 2, text: 'Test 2', completed: 1 },
        { id: 3, text: 'Test 3', completed: false },
        { id: 4, text: 'Test 4', completed: true },
      ]

      const formatted = formatTodos(dbResponse)
      
      expect(formatted).toEqual([
        { id: 1, text: 'Test 1', completed: false },
        { id: 2, text: 'Test 2', completed: true },
        { id: 3, text: 'Test 3', completed: false },
        { id: 4, text: 'Test 4', completed: true },
      ])
    })
  })
})