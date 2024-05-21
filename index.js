import cors from "cors";
import express from "express";
import morgan from "morgan"
import router from "./index.route.js";
import mongooseConnection from "./api/config/db.config.js"

const PORT = process.env.PORT || 3000;
const corsOptions = { origin: "http://localhost:4000" };

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Sepehr Peyma." });
});
mongooseConnection()
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT} 🛡️
  ################################################
`);
});
