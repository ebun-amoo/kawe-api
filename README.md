# Kàwé API

Backend API for **Kàwé**, a Yorùbá language-learning platform.

Built with Node.js, Express, TypeScript, PostgreSQL, and Prisma.

## Tech Stack

* Node.js
* Express
* TypeScript
* PostgreSQL
* Prisma
* Zod
* JWT
* bcrypt
* Jest & Supertest

## Features

### Authentication

* User registration
* User login
* JWT access tokens
* Refresh token rotation
* Secure refresh token storage
* Logout
* Authentication middleware
* Get current user

### Coming Soon

* Lessons and learning progress
* Flashcards and quizzes
* Leaderboard
* Instructor features
* Email notifications

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ebun-amoo/kawe-api.git
cd kawe-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Then add your database connection and JWT configuration.

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:8080
```

## API Documentation

Swagger API documentation is available at:

```text
/api-docs
```

## Project Structure

```text
src/
├── controllers/
├── middleware/
├── routes/
├── services/
├── schemas/
├── types/
├── utils/
└── lib/
```

## Status

🚧 **In development**

Kàwé is being developed as an MVP.
