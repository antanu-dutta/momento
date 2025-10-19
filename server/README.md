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
  "message": "Login successful",
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

### POST /api/auth/logout

Logout the current user by clearing the authentication cookie.

#### Responses

##### Success (200 OK)

```json
{
  "message": "Logged out successfully"
}
```

### GET /api/auth/me

Get the current authenticated user's information. Requires authentication.

#### Responses

##### Success (200 OK)

```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

##### Error Responses

- **401 Unauthorized** - Not authenticated

```json
{
  "message": "No token, authorization denied"
}
```

```json
{
  "message": "Token is not valid"
}
```

```json
{
  "message": "Token has expired"
}
```

```json
{
  "message": "User not found"
}
```

- **500 Internal Server Error** - Server error

```json
{
  "message": "Server error"
}
```

## Authentication

The API uses secure HTTP-only cookies for authentication. After successful login or signup, a JWT token will be automatically set in the cookies. The cookie is:

- HTTP-only (not accessible via JavaScript)
- Secure in production (HTTPS only)
- SameSite strict (CSRF protection)
- Expires in 7 days

No manual token handling is required as cookies are automatically sent with requests.

### Protected Routes

To access protected routes:

1. First login or signup to get the authentication cookie
2. The cookie will be automatically sent with subsequent requests
3. If unauthorized, the API will respond with a 401 status code
4. To logout, call the logout endpoint which will clear the cookie

### CORS Configuration

The API is configured to:

- Accept requests from http://localhost:5173 (development)
- Allow credentials (cookies)
- Use strict CORS policies for security

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
