# mongooseExpress.ts API Documentation

## Overview

This project is a **TypeScript-based Express.js application** utilizing Mongoose for MongoDB interactions. It provides APIs for user authentication and student management. This documentation details the API endpoints with examples for usage.

### Base URL:

```
https://mongoose-express-ts.vercel.app/api/v1
```

## Authentication Endpoints

### 1. **User Registration**

- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Request Body (JSON):**

```json
{
  "name": "Shojol Islam",
  "email": "shojolislam.webappick@gmail.com",
  "password": "12345678",
  "profileUrl": "https://avatars.githubusercontent.com/u/138320818?s=400&u=bdcea28c82fc5a93e8009883235ffb7b5012534b&v=4",
  "contactNo": "+8801532316559"
}
```

- **Response:**
  - Success: HTTP 201 Created

### 2. **User Login**

- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Request Body (JSON):**

```json
{
  "email": "charlie.white@example.com",
  "password": "hashed_password_def"
}
```

- **Response:**
  - Success: HTTP 200 OK (Token provided)

---

## Student Management Endpoints

### 1. **Add a Student**

- **Method:** `POST`
- **Endpoint:** `/student`
- **Headers:**
  - Authorization: Bearer `<token>`
- **Request Body (JSON):**

```json
{
  "name": "John Doe",
  "age": 18,
  "gender": "Male",
  "contactNo": "+1234567890",
  "address": "123 Elm Street, Springfield, USA",
  "bloodGroup": "A+",
  "profileImage": "https://example.com/profile/johndoe.jpg",
  "isActive": true,
  "familyInfo": {
    "fatherName": "Robert Doe",
    "fatherOccupation": "Engineer",
    "fatherContactNo": "+1234567891",
    "motherName": "Jane Doe",
    "motherOccupation": "Teacher",
    "motherContactNo": "+1234567892"
  },
  "email": "john.doe@example.com"
}
```

- **Response:**
  - Success: HTTP 201 Created

### 2. **Get a Student by ID**

- **Method:** `GET`
- **Endpoint:** `/student/:id`
- **Headers:**
  - Authorization: Bearer `<token>`
- **Response:**
  - Success: HTTP 200 OK (Student data)

### 3. **Get All Students**

- **Method:** `GET`
- **Endpoint:** `/student`
- **Headers:**
  - Authorization: Bearer `<token>`
- **Response:**
  - Success: HTTP 200 OK (List of students)

### 4. **Update a Student**

- **Method:** `PUT`
- **Endpoint:** `/student/:id`
- **Headers:**
  - Authorization: Bearer `<token>`
- **Request Body (JSON):**

```json
{
  "age": 32,
  "gender": "male"
}
```

- **Response:**
  - Success: HTTP 200 OK (Updated student data)

### 5. **Delete a Student**

- **Method:** `DELETE`
- **Endpoint:** `/student/:id`
- **Headers:**
  - Authorization: Bearer `<token>`
- **Response:**
  - Success: HTTP 200 OK (Confirmation of deletion)

### 6. **Get Students Using Filters**

- **Method:** `GET`
- **Endpoint:** `/student/filtered`
- **Headers:**
  - Authorization: Bearer `<token>`
- **Query Parameters:**
  - `queryField` (e.g., `age`)
  - `queryValue` (e.g., `17`)
  - `page` (e.g., `3`)
  - `perPage` (e.g., `20`)
- **Example Request:**

```
GET /student/filtered?queryField=age&queryValue=17&page=3&perPage=20
```

- **Response:**
  - Success: HTTP 200 OK (Filtered student data)

---

## Notes

- **Authentication:** All endpoints except `/auth/register` and `/auth/login` require a valid JWT token in the `Authorization` header.
- **Error Handling:** Ensure to handle HTTP errors appropriately (e.g., 401 Unauthorized, 404 Not Found).

Feel free to modify and extend the endpoints as needed for your application! 🚀
