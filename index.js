import cors from "cors";
import morgan from "morgan";
import express from "express";
import router from "./index.route.js";
import swaggerUi from "swagger-ui-express";

import ApiError from "./api/errors/ApiError.js";
import openapiSpecification from "./swagger.js";
import mongooseConnection from "./api/config/db.config.js";
import apiErrorHandler from "./api/middlewares/apiErrorHandler.js";
import rateLimiter from "./api/middlewares/rateLimiter.js";

const PORT = 5000;
const corsOptions = { origin: "http://localhost:4000" };

const app = express();
app.use(rateLimiter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Sepehr Peyma." });
});
mongooseConnection();
app.use("/api", router);

// app.use((req, res, next) => {
//   next(new ApiError.notFound("Route not found"));
//   // const error = ApiError.notFound("Route not found");
//   // next(error);
// });

app.use(apiErrorHandler);
app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT} 🛡️
  ################################################
`);
});
