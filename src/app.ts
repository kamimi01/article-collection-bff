import express from "express";
import { router } from "./routes/router";
export const app = express();

app.use("/", router);
