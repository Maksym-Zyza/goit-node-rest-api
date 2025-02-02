import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";
import sequelize from "./db/sequelize.js";
import "dotenv/config";
import path from "path";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use(express.static(path.join("public")));

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { PORT = 3000 } = process.env;
const port = Number(PORT);

try {
  await sequelize.authenticate();
  console.log("Database connection successful");

  app.listen(port, () => {
    console.log("Server is running on port: 3000");
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
