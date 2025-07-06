# Project Overview: Todo App

This is a Todo application built with Next.js 14 and a MySQL backend. It allows users to create, read, update, and delete todos. The entire stack is containerized using Docker.

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Frontend**: React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL 8.0
- **Testing**: Jest, React Testing Library
- **Containerization**: Docker, Docker Compose

## Key Commands

- **Run development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Start production server**: `npm run start`
- **Run linter**: `npm run lint`
- **Run tests**: `npm run test`

## How to Run the Application

The recommended way to run this application is by using Docker.

1.  **Start the application stack (app + database):**
    ```bash
    docker-compose up
    ```

2.  **Stop the application:**
    ```bash
    docker-compose down
    ```

The application will be available at [http://localhost:3000](http://localhost:3000).
