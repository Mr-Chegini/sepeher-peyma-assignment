<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express.js Logo" width="200">
</div>

# sepehr-peyma-assignment

## Project Description

**sepehr-peyma-assignment** is a simple CRUD (Create, Read, Update, Delete) application built using Node.js, Express.js, and MongoDB. It provides APIs to perform CRUD operations on user data.

## Installation Instructions

### Using Docker

1. Make sure you have Docker installed on your machine.
2. Clone the repository.
3. Navigate to the project root directory.
4. Run the following command to build the Docker image:
   ```bash
   docker build -t sepehr-peyma-assignment .
   ```
5. After the image is built, run the Docker container:
   ```bash
   docker run -p 3000:3000 sepehr-peyma-assignment
   ```

### Without Docker

1. Make sure you have Node.js v20 and MongoDB installed on your machine.
2. Clone the repository.
3. Navigate to the project root directory.
4. Install dependencies by running:
   ```bash
   npm install
   ```
5. Start the application by running:
   ```bash
   npm start
   ```

## Usage Instructions

You can interact with the APIs using tools like Postman or Swagger. The Postman collection containing the API requests is provided in the project root folder. Alternatively, you can use Swagger [http://localhost:5000/api-docs](http://localhost:5000/api-docs) to explore the APIs.

## API Documentation

- **GET /users**: Retrieve all users.
- **POST /users**: Create a new user.
- **GET /users/:id**: Retrieve a specific user by ID.
- **PUT /users/:id**: Update a specific user by ID.
- **DELETE /users/:id**: Delete a specific user by ID.

## Technologies Used

- Node.js v20
- Express.js
- MongoDB
- Jest for testing

## Testing Instructions

To run tests, execute the following command:

```bash
npm run test
```

## Contact Information

- Email: amirchegini007@gmail.com
- LinkedIn: [www.linkedin.com/in/mr-chegini](https://www.linkedin.com/in/mr-chegini)
