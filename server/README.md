# Momento API Documentation

## Authentication Endpoints

### POST /api/auth/signup

Register a new user account.

#### Request Body

```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

#### Responses

##### Success (201 Created)

```json
{
  "message": "User created",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT token
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

##### Error Responses

- **400 Bad Request** - Missing required fields

```json
{
  "message": "Name, email and password are required"
}
```

- **409 Conflict** - Email already exists

```json
{
  "message": "Email already in use"
}
```

- **500 Internal Server Error** - Server error

```json
{
  "message": "Server error"
}
```

### POST /api/auth/login

Login to an existing account.

#### Request Body

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

#### Responses

##### Success (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT token
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

##### Error Responses

- **400 Bad Request** - Missing required fields

```json
{
  "message": "Email and password required"
}
```

- **401 Unauthorized** - Invalid credentials

```json
{
  "message": "Invalid credentials"
}
```

- **500 Internal Server Error** - Server error

```json
{
  "message": "Server error"
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login or signup, you'll receive a JWT token that should be included in subsequent requests in the Authorization header:

```
Authorization: Bearer your-jwt-token
```

The token expires in 7 days after issuance.
