# School Management System

## Introduction

The School Management System is a project designed to streamline interactions among students, schools, and classrooms. This system facilitates various tasks such as user management, school administration, and classroom organization.

## Installation

To run the project, execute the following command:

```
docker-compose up
```

Ensure you have an `.env` file configured with the following variables:

- `MONGO_URI`: MongoDB connection URI
- `REDIS_URI`: Redis connection URI
- `LONG_TOKEN_SECRET`: Secret for generating long-lived JWT tokens
- `SHORT_TOKEN_SECRET`: Secret for generating short-lived JWT tokens
- `NACL_SECRET`: Secret for cryptographic operations

## Database Schemas

### User

- `isActive`
- `username`
- `email`
- `password`
- `key`

### School

- `name`
- `address`
- `id`
- `website`
- `schoolManager`
- `classRooms`
- `totalStudents`
- `totalClassrooms`

### Classroom

- `name`
- `school`
- `id`
- `students`
- `totalStudents`

### Counter

Used to generate unique IDs incrementally.

- `model`
- `seq`

## Endpoints

### Users

#### /user/createAdmin

- **Payload:** `username`, `password`, `email`

#### /user/create

- **Payload:** `username`, `password`, `email`, `key` (default is "student")

#### /user/login

- **Payload:** `email`, `password`
- **Token in header**

### School

#### /api/school/getAll

- **HTTP Method:** GET
- **Requires token in header**

#### /api/school/get/:id

- **HTTP Method:** GET
- **Requires token in header**

#### /api/school/update/:id

- **HTTP Method:** PUT
- **Note:** Accessible only by superAdmin
- **Requires token in header**

#### /api/school/delete/:id

- **HTTP Method:** DELETE
- **Note:** Accessible only by superAdmin
- **Requires token in header**

### Classroom

#### /api/classroom/getAll

- **HTTP Method:** GET
- **Requires token in header**

#### /api/classroom/get/:id

- **HTTP Method:** GET
- **Requires token in header**

#### /api/classroom/update/:id

- **HTTP Method:** PUT
- **Note:** Accessible by manager or superAdmin
- **Requires token in header**

#### /api/classroom/delete/:id

- **HTTP Method:** DELETE
- **Note:** Accessible by manager or superAdmin
- **Requires token in header**

## Live URL

The project is live at [https://careful-wrap.cyclic.app/](https://careful-wrap.cyclic.app/).