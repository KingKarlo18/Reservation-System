import express from "express";
import { config } from "dotenv";

config();

const app = express();

app.get("/", (req, res) => {
  res.send("This is Reservation App");
});

const PORT = process.env.PORT || 3000;

export { app, PORT };
