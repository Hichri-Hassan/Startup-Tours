# Startup-Tours Backend API

A well-structured Express.js backend with middleware, routes, and service architecture.

## Project Structure

```
src/backend/
├── index.js                 # Application entry point
├── package.json            # Dependencies
├── .env                    # Environment variables (create from .env.example)
├── .env.example            # Environment variables template
└── src/
    ├── config/             # Configuration management
    │   └── index.js
    ├── controllers/        # Request handlers
    │   ├── authController.js
    │   ├── userController.js
    │   ├── gameController.js
    │   └── index.js
    ├── middlewares/        # Custom middleware
    │   ├── auth.js         # Authentication middleware
    │   ├── errorHandler.js # Global error handler
    │   ├── notFound.js     # 404 handler
    │   ├── validate.js     # Request validation
    │   └── index.js
    ├── routes/             # API routes
    │   ├── authRoutes.js   # /api/auth/*
    │   ├── userRoutes.js   # /api/users/*
    │   ├── gameRoutes.js   # /api/games/*
    │   └── index.js
    ├── services/           # Business logic
    │   ├── authService.js
    │   ├── userService.js
    │   ├── gameService.js
    │   └── index.js
    └── utils/              # Helper functions
        ├── asyncHandler.js
        ├── ApiError.js
        └── index.js
```

## Architecture Overview

### Layers

1. **Routes** (`src/routes/`)
   - Define API endpoints
   - Handle HTTP method routing
   - Apply route-specific middleware

2. **Controllers** (`src/controllers/`)
   - Handle HTTP requests and responses
   - Validate input
   - Call services
   - Format responses

3. **Services** (`src/services/`)
   - Contain business logic
   - Database operations (when implemented)
   - Data transformations
   - Reusable across controllers

4. **Middlewares** (`src/middlewares/`)
   - Authentication/Authorization
   - Request validation
   - Error handling
   - Logging

5. **Utils** (`src/utils/`)
   - Helper functions
   - Custom error classes
   - Common utilities

## Installation

```bash
# Install dependencies
npm install

# Install jsonwebtoken (required for authentication)
npm install jsonwebtoken
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=3000
CORS_ORIGIN=*
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
DATABASE_URL=mongodb://localhost:27017/startup-tours
```

## Running the Server

```bash
# Development
npm start

# Or with node
node index.js
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/logout` - Logout user (requires auth)

### Users (`/api/users`)
- `GET /api/users/me` - Get current user profile (requires auth)
- `GET /api/users` - Get all users (requires auth)
- `GET /api/users/:id` - Get user by ID (requires auth)
- `PUT /api/users/:id` - Update user profile (requires auth)
- `DELETE /api/users/:id` - Delete user (requires auth)

### Games (`/api/games`)
- `POST /api/games` - Create new game (requires auth)
- `GET /api/games/me` - Get current user's games (requires auth)
- `GET /api/games/:id` - Get game by ID (requires auth)
- `PUT /api/games/:id` - Update game (requires auth)
- `POST /api/games/:id/result` - Save game result (requires auth)
- `GET /api/games/user/:userId` - Get user's games (requires auth)

### Health Check
- `GET /` - API info
- `GET /health` - Server health status

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Getting a Token

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","username":"testuser"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Using the Token

Include the token in the Authorization header:

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Error Handling

All errors are handled by the global error handler middleware. Errors are returned in the following format:

```json
{
  "success": false,
  "error": {
    "message": "Error message here",
    "stack": "Stack trace (only in development)"
  }
}
```

## Response Format

Successful responses follow this format:

```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

## Next Steps

To make this a production-ready API, you should:

1. **Add Database Integration**
   - Install MongoDB/PostgreSQL/MySQL
   - Add ORM (Mongoose/Sequelize/Prisma)
   - Update services to use real database

2. **Add Password Hashing**
   ```bash
   npm install bcrypt
   ```
   - Update authService to hash passwords

3. **Add Input Validation**
   ```bash
   npm install joi
   ```
   - Create validation schemas
   - Update controllers to validate input

4. **Add Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

5. **Add Request Logging**
   ```bash
   npm install winston
   ```

6. **Add Testing**
   ```bash
   npm install --save-dev jest supertest
   ```

7. **Add API Documentation**
   ```bash
   npm install swagger-ui-express swagger-jsdoc
   ```

## Development Tips

- Services contain business logic and should be framework-agnostic
- Controllers handle HTTP-specific logic (req, res)
- Keep routes thin - just route definitions
- Use middleware for cross-cutting concerns
- Throw errors in services, catch them in controllers
- Use the ApiError class for consistent error handling

## License

MIT
