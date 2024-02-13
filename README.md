# School Management System

## Introduction
This project is a School Management System designed to facilitate interactions between three primary parties: students, schools, and classrooms.

## Installation
To run the project, execute the following command:
```bash
docker-compose up
```
Additionally, ensure you have an `.env` file configured with the following variables:
- `MONGO_URI`
- `REDIS_URI`
- `LONG_TOKEN_SECRET`
- `SHORT_TOKEN_SECRET`
- `NACL_SECRET`

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
This is used to create unique keys called IDs, incrementally.
- `model`
- `seq`

## Endpoints
### Users
- `/user/createAdmin`
  - Payload: `username`, `password`, `email`
- `/user/create`
  - Payload: `username`, `password`, `email`, `key` (student default)
- `/user/login`
  - Payload: `email`, `password`
  - Token in header

### School
- `/api/school/getAll`
  - Exposed HTTP Method: `GET`
  - Requires token in header.
- `/api/school/get/:id`
  - Exposed HTTP Method: `GET`
  - Requires token in header.
- `/api/school/update/:id`
  - Exposed HTTP Method: `PUT`
  - Note: Only accessible by superAdmin.
  - Requires token in header.
- `/api/school/delete/:id`
  - Exposed HTTP Method: `DELETE`
  - Note: Only accessible by superAdmin.
  - Requires token in header.

### Classroom
- `/api/classroom/getAll`
  - Exposed HTTP Method: `GET`
  - Requires token in header.
- `/api/classroom/get/:id`
  - Exposed HTTP Method: `GET`
  - Requires token in header.
- `/api/classroom/update/:id`
  - Exposed HTTP Method: `PUT`
  - Note: Accessible by manager or superAdmin.
  - Requires token in header.
- `/api/classroom/delete/:id`
  - Exposed HTTP Method: `DELETE`
  - Note: Accessible by manager or superAdmin.
  - Requires token in header.

## Live URL
This project is live at [https://careful-wrap.cyclic.app/](https://careful-wrap.cyclic.app/).
