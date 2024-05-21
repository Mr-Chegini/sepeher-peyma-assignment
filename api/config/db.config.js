import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/sepehr-peyma";

export default function mongooseConnection() {
  mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
}
