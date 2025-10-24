# Architecture Choice

## Problem Statement

The requirement states that we need to have a front-end and back-end seperately. This separation of concerns allows for better scalability, maintainability, and flexibility in development.

## Solution Architecture proposed

The proposed architecture consists of the following components:

- Front-end: Vite + React with Material UI.
- Back-end: Node.js with Express.
- Database: MongoDB.
- Testing: Jest and React Testing Library (RTL).
- Deployment: Local setup using Docker and Docker Compose.

Note: While serverless architecture is suggested, I have chosen Express for its simplicity and ease of setup for local development. All the codebase will using typescript for better type safety and maintainability.
