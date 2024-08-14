# MERN STACK SHOPPING CART ASSESSMENT


## Overview

This project is a full-stack application that includes a frontend built with React, a backend with Node.js and Express, and a MongoDB database. It demonstrates how to build a complete web application with modern technologies and practices.


## Prerequisites

List any prerequisites or dependencies required to run the project.

Node.js (version 16 or higher)
Docker
Docker Compose
MongoDB


## Installation

### Clone the Repository

```bash
git clone http://techary-limit-akkrxd@git.codesubmit.io/techary-limited/tech-store-showdown-eexndh
cd tech-store-showdown-eexndh

```



## Envioronment Setup

### Backend

1. Navigate to backend directory

```bash
cd backend


```
2. Install Dependencies

```bash
npm install


```

3. Create a .env file in the root of backend directory and add the following variables:

```plaintext

    PORT=5000
    MONGO_URI=mongodb://mongo:27017/store
    TEST_PORT=5000

```

Note we are using mongo official image to deploy our mongodb instance, but
should you decide to use Atlas, kindly replace MONGO_URI to the url of your mongodb cluster


### Frontend

1. Navigate to frontend directory

```bash
cd frontend


```
2. Install Dependencies

```bash
npm install


```

3. Create a .env file in the root of backend directory and add the following variables:

```plaintext

    REACT_APP_API_URL=http://localhost:5000/api
    REACT_APP_PORT=3000


```


## Testing Backend Locally(Optional)

To run tests locally with a MongoDB connection,  follow these steps:

### **1. Setup MongoDB**

1. **Install MongoDB:**

   If you don’t have MongoDB installed, you can download and install it from the [official MongoDB website](https://www.mongodb.com/try/download/community).

2. **Start MongoDB:**

   Make sure MongoDB is running on your local machine. You can start it with:

   ```bash
   mongod

3. **Replace MONGO_URI:**

    In the backend .env, change the MONGO_URI to the below

```plaintext


    MONGO_URI=mongodb://localhost:27017/store
  
```
4. **Importing Seed Data**

    Importing Product Seed to your mongodb database using Compass, Visit https://www.mongodb.com/try/download/compass to download Compass if not installed.




 Import **store.products.json**  file found in the project root into the store database using Compass


Run the test

   ```bash
   cd backend
   npm test

```
This should run the test case located in "backend/_test_/app.test.js"


## Deployment Guide: Deploying MERN Stack with Docker Compose

There are many options available for deploying a MERN stack application. Some popular methods include using cloud platforms like AWS, Heroku, DigitalOcean, or container orchestration tools like Kubernetes. However, in this guide, we will focus on deploying a MERN stack using Docker Compose. Docker Compose simplifies the deployment process by allowing you to manage and run multi-container Docker applications with ease.


## Deployment Steps

### Backend (Node.js/Express) Dockerfile:
    Create a 'Dockerfile' in your backend directory if not existing

```Dockerfile

   # Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["node", "app.js"]


```

### Frontend (React js) Dockerfile:
    Create a 'Dockerfile' in your frontend directory if not existing

```Dockerfile

# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=0 /app/build /usr/share/nginx/html
# copy  nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 3000

# Run nginx
CMD ["nginx", "-g", "daemon off;"]

```

### Nginx config file to serve the frontend 
    Create a nginx.conf file in the frontend directory if not existing

```nginx

    server {
    listen 3000;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}

```

### Docker Compose Configuration
    Create a docker-compose.yml in the project root directory if not existing

    Docker Compose simplifies the deployment process by allowing you to manage and run multi-container Docker applications with ease.

```yaml

version: '3.8'

services:
  backend:
    build:
      context: ./backend
    env_file:
      - ./backend/.env
    ports:
      - "5000:5000"
    networks:
      - app-network
    depends_on:
      - mongo

  frontend:
    build:
      context: ./frontend
    
    env_file:
      - ./frontend/.env
    ports:
      - "3000:3000"
    networks:
      - app-network

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

```


### Replace MONGO_URI

    In the backend .env, change the MONGO_URI to the below

```plaintext


    MONGO_URI=mongodb://mongo:27017/store
  
```

    Why ? , This is because we are making use of the official mongodb docker image, and we need
    to point to mongo and not localhost.


### RUN DOCKER COMPOSE

Run the below command in the project root directory

```bash

    docker-compose up --build

```

    The above should build containers for frontend, backend and mongodb

### Importing Seed Data**

    Importing Product Seed to your mongodb database using Compass, Visit https://www.mongodb.com/try/download/compass to download Compass if not installed.




 Connect mongodb running container to Compass and import **store.products.json**  file found in the project root into the store database.


### Accessing the Application**

    Frontend : http://localhost:3000
    Backend : http://localhost:5000








