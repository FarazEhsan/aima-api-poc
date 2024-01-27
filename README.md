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

## Restocking Report

The inventory-report endpoint returns data that assists decision-makers in determining the restocking needs of all products. The average sale of each product for the month is calculated (the average is interpolated if the report is generated in the middle of the month). Using the average sale per month and the current stock of a product, the report provides a 'restockingAmount' for each product. This 'restockingAmount' represents the quantity of the product that needs to be restocked for the coming month. Below is the SQL query.
```sql
SELECT 
        p.productname,
        pv.unit,
        ROUND(AVG(s.quantity))::INTEGER AS "averageSalesPerDay",
        ROUND((AVG(s.quantity) * (EXTRACT(DAY FROM DATE_TRUNC('MONTH', CURRENT_DATE) + INTERVAL '1 MONTH' - INTERVAL '1 DAY') - EXTRACT(DAY FROM CURRENT_DATE))) - (pv.currentstock - SUM(s.quantity)))::INTEGER AS "restockingAmount",
        pv.currentstock,
        pv.minimumstock
    FROM 
        public.sale s
    JOIN 
        public.productvariant pv ON s."productVariantId" = pv.id
    JOIN 
        public.product p ON pv."productId" = p.id
    WHERE 
        EXTRACT(MONTH FROM s."updDate") = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(DAY FROM s."updDate") <= EXTRACT(DAY FROM CURRENT_DATE)
    GROUP BY 
        p.productname, pv.unit, pv.currentstock, pv.minimumstock;
```

This SQL is stored as a db function in the postgres database. Once the container is up and running the application creates this function in the database.  

