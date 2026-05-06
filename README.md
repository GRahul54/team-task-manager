# Team Task Manager

A full-stack web application for managing team projects and tasks with role-based access control.

## Features

- **Authentication**: User signup and login
- **Project Management**: Create and manage projects
- **Task Management**: Create, assign, and track tasks
- **Role-Based Access**: Admin and Member roles
- **Dashboard**: Overview of projects, tasks, and overdue items

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Deployment**: Railway

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and `MONGODB_URI`
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open the single entry link in your browser:
   ```bash
   http://localhost:3000
   ```

## Environment Variables

- `NEXTAUTH_SECRET`: A secret key for NextAuth
- `NEXTAUTH_URL`: The URL of your application
- `MONGODB_URI`: MongoDB connection string

## API Endpoints

- `POST /api/users` - Create a new user
- `GET /api/projects` - Get user's projects
- `POST /api/projects` - Create a new project
- `GET /api/tasks` - Get tasks (optionally filtered by project)
- `POST /api/tasks` - Create a new task

## Deployment

### Railway

1. Push this project to GitHub.
2. Create a new Railway project and connect the GitHub repository.
3. In Railway, set these environment variables:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `MONGODB_URI`
4. Deploy the project.
5. Railway will provide a live URL for the app.

### Recommended Hosting Options

- Railway
- Vercel
- Render

> Use a paid or persistent plan if you need the site to remain live for 6 months.

## Notes for 6-Month Availability

- Use a persistent MongoDB instance (Atlas, Railway MongoDB, or another managed database).
- Avoid free hosting limits that may put the app to sleep or delete unused projects.
- Keep the Railway or hosting account active and billing setup valid.

## Demo Video

[Link to 2-5 min demo video]

## License

MIT