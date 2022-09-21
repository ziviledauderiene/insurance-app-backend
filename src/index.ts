import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes";
import ProcessEnv from "./utils/env.d";

const app = express();

dotenv.config();

const {
  PORT,
  MONGO_COMPASS_USER,
  MONGO_COMPASS_PASS,
  MONGO_COMPASS_CLUSTER_DB,
  MONGO_COMPASS_CLUSTER_URL,
}: ProcessEnv = process.env;

app.use(express.json());
app.use(cors());
app.use(router);

const db = mongoose.connection;
mongoose.connect(
  `mongodb+srv://${MONGO_COMPASS_USER}:${MONGO_COMPASS_PASS}@${MONGO_COMPASS_CLUSTER_URL}/${MONGO_COMPASS_CLUSTER_DB}?retryWrites=true&w=majority`
);

db.once("open", () => {
  console.log("Connected to DB successfully!");
  app.listen(PORT, () =>
    console.log(`Server is running on port http://localhost:${PORT}`)
  );
});

db.on("error", () => console.error("FAILED TO CONNECT TO DB"));
