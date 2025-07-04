# Todo App

Next.js 14 todo application with MySQL backend using Docker for containerization.

## Features

- ✅ Create, read, update, and delete todos
- 🗄️ MySQL database with connection pooling
- 🐳 Docker containerization
- 🎨 Modern UI with Tailwind CSS
- 📝 TypeScript support

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL 8.0
- **Containerization**: Docker & Docker Compose

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kubosaka/claude-code-test.git
   cd claude-code-test
   ```

2. Start the application with Docker:
   ```bash
   docker-compose up
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development

For local development without Docker:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Start MySQL database:
   ```bash
   docker-compose up db
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Docker Commands

- `docker-compose up` - Start the full application stack (app + MySQL database)
- `docker-compose down` - Stop all services
- `docker-compose up --build` - Rebuild and start services

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

## Environment Variables

- `DB_HOST` (default: 'db')
- `DB_USER` (default: 'root')
- `DB_PASSWORD` (default: 'password')
- `DB_NAME` (default: 'todoapp')

## Database Schema

```sql
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## License

This project is open source and available under the MIT License.
