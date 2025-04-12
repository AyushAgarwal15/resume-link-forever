# Resume Link Backend

A backend API for the Resume Link application using Express, PostgreSQL, Prisma, and JWT authentication.

## Technologies Used

- Node.js & Express.js
- TypeScript
- PostgreSQL (NeonDB)
- Prisma ORM
- JWT for authentication
- Express Validator for input validation

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- PostgreSQL database (We're using NeonDB)

### Setup

1. Clone the repository
2. Install dependencies

```bash
cd Backend
npm install
```

3. Configure environment variables
   - Create a `.env` file in the root of the Backend directory
   - Add the following variables:

```
DATABASE_URL="postgresql://your_username:your_password@your_neon_host/your_database"
JWT_SECRET="your_jwt_secret"
PORT=8000
```

4. Generate Prisma client

```bash
npx prisma generate
```

5. Run database migrations

```bash
npx prisma migrate dev --name init
```

6. Start the development server

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Users

- `GET /api/users/me` - Get current authenticated user (Protected)

## How to Use

### Register a new user

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com", "password":"password123", "name":"John Doe"}'
```

### Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com", "password":"password123"}'
```

### Get Current User (Protected Route)

```bash
curl -X GET http://localhost:8000/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
