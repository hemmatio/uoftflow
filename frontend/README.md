# UofTFlow Frontend - API Tester

This is a simple React frontend for testing the UofTFlow API endpoints.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Make sure your Rails backend is running on port 3001 (or update the proxy in `vite.config.js`).

## Features

This frontend provides buttons to interact with all API endpoints:

### Authentication
- `POST /signup` - Create a new user
- `POST /login` - Log in
- `DELETE /logout` - Log out
- `GET /me` - Get current user

### Search
- `GET /search` - Search across the platform

### Departments
- `GET /departments` - List all departments
- `GET /departments/:id` - Get a specific department
- `POST /departments` - Create a new department
- `GET /departments/:id/courses` - List courses in a department

### Courses
- `GET /courses` - List all courses
- `GET /courses/:id` - Get a specific course
- `POST /courses` - Create a new course
- `GET /courses/:id/reviews` - List reviews for a course
- `GET /courses/:id/course_offerings` - List offerings for a course

### Professors
- `GET /professors` - List all professors
- `GET /professors/:id` - Get a specific professor
- `POST /professors` - Create a new professor
- `GET /professors/:id/reviews` - List reviews for a professor
- `GET /professors/:id/course_offerings` - List offerings by a professor

### Course Offerings
- `GET /course_offerings` - List all course offerings
- `GET /course_offerings/:id` - Get a specific offering
- `POST /course_offerings` - Create a new offering
- `GET /course_offerings/:id/reviews` - List reviews for an offering

### Reviews
- `POST /reviews` - Create a new review
- `DELETE /reviews/:id` - Delete a review

### Health
- `GET /up` - Health check endpoint

