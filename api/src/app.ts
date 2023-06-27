import express from "express";
import cors from "cors";
import { routerApp } from "./routes/index.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/v1", routerApp);

export { app };
