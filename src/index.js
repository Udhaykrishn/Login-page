import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { sessionConfig } from "./config/session.config.js";
import deafultRouter from "./routers/auth.routers.js";
import path from "path";
import { fileURLToPath } from "url";
import { morganConfig } from "./config/morgan.config.js";
import nocache from "nocache";
import {
  createAccessLogStream,
  createLogger,
} from "./services/morgan.services.js";


const app = express();

createLogger();

 

app.use(nocache());
const PORT = process.env.PORT || 3001;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.set("view engine", "ejs");
app.set("views", path.join(dirname, "views"));

// middlelwares

app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);
app.use(morganConfig(createAccessLogStream));

app.use("/", deafultRouter);

if (process.env.PORT === "3000") {
  app.listen(PORT, () => console.log("Server is created", PORT));
}
export default app;
