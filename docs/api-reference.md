# API Reference

Base URL: `http://localhost:3000`

## Overview

This API supports user registration and login.

- Health check: confirms service availability.
- Registration: validates input, enforces unique email, applies password policy.
- Login: validates credentials and returns JWT.

## Authentication

`POST /api/auth/login` returns a JWT token in the response body.

Current endpoints in this project do not require bearer token input, but you can reuse the returned token for future protected routes.

## Endpoints

### 1) Health Check

**Method:** `GET`

**Path:** `/api/health`

#### Success Response

Status: `200 OK`

```json
{
  "status": "ok",
  "service": "registration-api"
}
```

---

### 2) Register User

**Method:** `POST`

**Path:** `/api/auth/register`

**Optional Query Params:**

- `simulateEmailFailure=true`
  - Keeps registration successful while simulating confirmation-email failure.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "StrongPass1!",
  "confirmPassword": "StrongPass1!"
}
```

#### Validation Rules

- `email` is required and must be valid format.
- `email` must be unique (case-insensitive).
- `password` is required.
- `confirmPassword` is required.
- `password` and `confirmPassword` must match.
- `password` must include:
  - minimum 8 characters
  - at least one uppercase letter
  - at least one lowercase letter
  - at least one number
  - at least one special character

#### Success Response

Status: `201 Created`

```json
{
  "message": "Registration successful.",
  "data": {
    "userId": "9f44369b-59d5-46b6-90c0-9f4d80d5fbcb",
    "email": "user@example.com",
    "confirmationEmailSent": true
  }
}
```

#### Success Response (Simulated Email Failure)

Status: `201 Created`

```json
{
  "message": "Registration successful.",
  "data": {
    "userId": "9f44369b-59d5-46b6-90c0-9f4d80d5fbcb",
    "email": "user@example.com",
    "confirmationEmailSent": false,
    "warning": "Simulated email service failure"
  }
}
```

#### Error Responses

Status: `400 Bad Request` (missing fields)

```json
{
  "error": "MissingFields",
  "message": "Missing required fields: email, password, confirmPassword"
}
```

Status: `400 Bad Request` (invalid email)

```json
{
  "error": "InvalidEmailFormat",
  "message": "Please provide a valid email address."
}
```

Status: `400 Bad Request` (password mismatch)

```json
{
  "error": "PasswordMismatch",
  "message": "Password and confirmation do not match."
}
```

Status: `400 Bad Request` (weak password)

```json
{
  "error": "WeakPassword",
  "message": "Password does not meet security policy.",
  "details": [
    "Password must include at least one uppercase letter."
  ]
}
```

Status: `409 Conflict` (duplicate email)

```json
{
  "error": "EmailAlreadyExists",
  "message": "This email is already registered."
}
```

---

### 3) Login

**Method:** `POST`

**Path:** `/api/auth/login`

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "StrongPass1!"
}
```

#### Success Response

Status: `200 OK`

```json
{
  "message": "Login successful.",
  "data": {
    "userId": "9f44369b-59d5-46b6-90c0-9f4d80d5fbcb",
    "email": "user@example.com",
    "token": "<jwt-token>"
  }
}
```

#### Error Responses

Status: `400 Bad Request` (missing fields)

```json
{
  "error": "MissingFields",
  "message": "Missing required fields: email, password"
}
```

Status: `400 Bad Request` (invalid email)

```json
{
  "error": "InvalidEmailFormat",
  "message": "Please provide a valid email address."
}
```

Status: `401 Unauthorized` (invalid credentials)

```json
{
  "error": "InvalidCredentials",
  "message": "Email or password is incorrect."
}
```

---

## Common Responses

### Route Not Found

Status: `404 Not Found`

```json
{
  "error": "NotFound",
  "message": "Route not found."
}
```

### Internal Error

Status: `500 Internal Server Error`

```json
{
  "error": "InternalServerError",
  "message": "Unexpected error occurred."
}
```

## Runtime Modes

### Mongo Mode (default)

- `DB_PROVIDER=mongo`
- Uses MongoDB via `MONGODB_URI`.

### In-Memory Mode

- `DB_PROVIDER=memory`
- No MongoDB connection.
- Data is reset when server restarts.
- Use for local development/demo only.

## Example cURL Commands

### Health

```bash
curl -s http://localhost:3000/api/health
```

### Register

```bash
curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"StrongPass1!","confirmPassword":"StrongPass1!"}'
```

### Login

```bash
curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"StrongPass1!"}'
```
