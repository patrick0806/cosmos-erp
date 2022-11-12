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
  docker run --name cosmos-postgres \
    -p 5432:5432 \
    -e POSTGRES_DB=cosmos \
    -e POSTGRES_USER=cosmos \
    -e POSTGRES_PASSWORD=123 \
    -d postgres:14.4-alpine
```

#### Stop Database

```bash
docker stop cosmos-postgres
```

#### Remove database

```bash
docker rm cosmos-postgres
```

## Running the app

First, you need create a `.env` file at the project root:

```bash
######################
######ENV VARS########
######################
DATABASE_HOST=localhost
DATABASE_NAME=cosmos
DATABASE_USERNAME=cosmos
DATABASE_PASSWORD=123
DATABASE_PORT=5432

JWT_SECRET=batata
```

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

- Documentation (Swagger)
- TDD
- Tests (unitary/integration)
- CI/CD
- Logs and monitorin

## Swagger route is http://localhost:3005/api/v1/docs

# Project Database Initial Structure
![image](https://user-images.githubusercontent.com/47863242/201493234-ac984b20-de95-4947-ba14-f4468b708251.png)

This Project Database Structure can be viewed with more details here: https://dbdiagram.io/d/636fef60c9abfc6111722b47

