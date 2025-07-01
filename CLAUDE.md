# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## GitHub Operations

Use MCP GitHub tools for all GitHub operations instead of the `gh` CLI:
- Creating pull requests: Use `mcp__github__create_pull_request`
- Managing issues: Use `mcp__github__create_issue`, `mcp__github__update_issue`
- Repository operations: Use MCP GitHub tools for consistent authentication

## Docker Commands

- `docker-compose up` - Start the full application stack (app + MySQL database)
- `docker-compose down` - Stop all services
- `docker-compose up --build` - Rebuild and start services

## Architecture

This is a Next.js 14 todo application with a MySQL backend using Docker for containerization.

### Database Architecture
- MySQL 8.0 database with connection pooling via mysql2
- Single `todos` table with columns: id, text, completed, created_at
- Database connection configured in `lib/db.ts` with environment variable support
- Database initialized via `init.sql` script

### API Layer
- REST API routes in `app/api/todos/`
- Main collection endpoint: GET/POST `/api/todos`
- Individual todo endpoint: PUT/DELETE `/api/todos/[id]`
- All routes use the shared database connection pool from `lib/db.ts`

### Frontend Architecture
- Client-side React with TypeScript
- Single page application in `app/page.tsx`
- Uses fetch API for all backend communication
- State managed with React hooks (useState/useEffect)

### Environment Configuration
Database connection uses these environment variables (with defaults):
- `DB_HOST` (default: 'db')
- `DB_USER` (default: 'root') 
- `DB_PASSWORD` (default: 'password')
- `DB_NAME` (default: 'todoapp')

### Docker Setup
- App container runs on port 3000
- MySQL container runs on port 3306
- Volume mounting for development hot-reload
- Shared network for container communication