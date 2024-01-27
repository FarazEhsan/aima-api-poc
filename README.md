## Description

This is a Proof of Concept (POC) for the Advanced Inventory Management API (AIMA). This API is developed using the NestJS framework. Data is stored in a PostgreSQL database. The API is well-documented using Swagger UI. Authentication is based on JWT.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start
```
or to create and run in container
```bash
# Docker
$ docker-compose up
```

## Test

```bash
$ yarn test
```
or
```bash
$ npm test
```

## Application Usage

After starting the application, navigate to http://localhost:3000/api for Swagger UI. 

1. Navigate to http://localhost:3000/api for Swagger UI. 
2. Send a POST request to the auth endpoint with the request body as:
    ```json
    {
      "clientId": "client_id",
      "clientSecret": "client_secret"
    }
    ```
3. Copy the 'access_token', click on 'Authorize' on the top right corner of the screen, and then click on 'Close'.
4. Send authenticated calls to the required endpoint.