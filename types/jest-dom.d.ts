import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveTextContent(text: string | RegExp): R
      toHaveValue(value?: string | string[] | number): R
      toBeChecked(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toBeVisible(): R
      toHaveClass(className?: string): R
    }
  }
}