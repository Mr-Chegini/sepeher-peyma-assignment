import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import swaggerUi from "swagger-ui-express";

import router from "./index.route.js";
import openapiSpecification from "./swagger.js";
import CustomError from "./api/errors/CustomError.js";
import mongooseConnection from "./api/config/db.config.js";
import rateLimiter from "./api/middlewares/rateLimiter.js";
import globalErrorHandler from "./api/middlewares/globalErrorHandler.js";

const PORT = process.env.PORT || 3000;
const corsOptions = { origin: "http://localhost:4000" };

const app = express();

// Middleware
app.use(rateLimiter); // Rate limiting middleware
app.use(helmet()); // Helmet middleware for security headers
app.use(cors(corsOptions)); // CORS middleware
app.use(morgan("dev")); // Morgan middleware for logging
app.use(express.json()); // Body parsing middleware for JSON
app.use(express.urlencoded({ extended: true })); // Body parsing middleware for URL-encoded data
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification)); // API documentation middleware
app.get("/", (req, res) => res.json({ message: "Welcome to Sepehr Peyma." })); // Default route

// Routes
mongooseConnection(); // Initialize MongoDB connection
app.use("/api", router); // API routes

// Route not found handler
app.all("*", (req, res, next) => {
  const error = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(error);
});

// Global error handler
app.use(globalErrorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT} 🛡️
  ################################################
`);
});
