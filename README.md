# Resolution Tracker

A full-stack app to **create, track, and stay consistent with personal resolutions**. It combines a React UI with a Spring Boot API and a MySQL database, plus reminders and daily logging to keep progress visible.

## Tech Stack

- **Frontend**: React.js, Redux Toolkit, Redux-Saga
- **Backend**: Spring Boot (REST API)
- **Database**: MySQL
- **Auth**: JWT (token-based authentication)

## Key Features

- **JWT Authentication**: secure login, token-based API access
- **Resolutions**: create and track goals/resolutions over time
- **Daily Logs**: record daily progress/notes for each resolution
- **Reminders**: prompt users to log/act on their resolutions

## Backend Architecture (Simple)

This project follows a clean layered structure:

- **Controller**: receives HTTP requests (API endpoints)
- **Service**: contains business logic (rules, validations, workflows)
- **Repository**: talks to the database (CRUD via MySQL)

In short: **Controller → Service → Repository → MySQL**

## Simple Flow Diagram

```mermaid
flowchart LR
  U[User] -->|Uses UI| FE[React App]
  FE -->|Redux Toolkit + Redux-Saga\n(API calls)| API[Spring Boot REST API]

  API --> C[Controller]
  C --> S[Service]
  S --> R[Repository]
  R --> DB[(MySQL)]

  FE <-->|JWT token| API

  S -->|Schedules / triggers| REM[Reminder Logic]
  REM -->|Notifications / prompts| FE
```

## Run (High Level)

- **Frontend**: `npm install` then `npm start`
- **Backend**: run the Spring Boot application
- **Database**: configure MySQL connection in backend config and run migrations/DDL if present
