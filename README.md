# Cosmos ERP

## Project status: In Development

The api of a virtual store erp, integrated with the main sales platforms.

# API Development Process

This project is based on [NestJS](https://docs.nestjs.com/)

To running this project in dev mode you need threee things:

1. install dependences
2. Configure a local database
3. Run the app

These three steps are covered in sequence below

## Installation

```bash
yarn
```

## The Database (PostgreSQL)

#### Create database

```bash
  docker run --name my-schedule-postgres \
    -p 5432:5432 \
    -e POSTGRES_DB=my-schedule \
    -e POSTGRES_USER=my-schedule \
    -e POSTGRES_PASSWORD=123 \
    -d postgres:14.4-alpine
```

#### Stop Database

```bash
docker stop my-schedule-postgres
```

#### Remove database

```bash
docker rm my-schedule-postgres
```

## Running the app

First, you need create a `.env` file at the project root:

Then, you can run as follows:

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod

```

# Reflection

I created this project to see what it would be like to start a product project from scratch, where I would have to make all the decisions and choose what to use, and come to understand more about integrations with other apis.

I still don't know how long this project will take to finish but I want to add some things to it as a study, to give a proper focus on them which are:

- Documentation
- TDD
- Tests (unitary/integration)
- CI/CD
- Logs and monitorin

## Swagger route is http://localhost:3005/api-docs
