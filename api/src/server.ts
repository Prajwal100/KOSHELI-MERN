import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";

import routes from "./routes";

import db from "./models";
import config from "./config";

interface IError extends Error {
  status?: number;
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5000",
  "https://kosheli-express.netlify.app" 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  console.error(error);
  res.send({
    status: false,
    message: config.app.ENV === "dev" ? error.message : "server error",
    error: config.app.ENV === "dev" ? error : "",
  });
  return;
});

db.on("error", console.error.bind(console, "MongoDB connection error."));
db.on("close", function () {
  console.log("DB connection is close");
});
db.once("open", function () {
  console.log("Connected to MongoDB database.");
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", routes);
app.use("/",async(req: Request, res: Response, next: NextFunction)=>{
  res.send("API running...");
})

const mainServer = createServer(app);

const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";


app.use((req: Request, res: Response, next: NextFunction) => {
  const error: IError = new Error(`Path doesn't exist ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  console.error(error);
  res.send({
    status: false,
    message: config.app.ENV === "dev" ? error.message : "server error",
    error: config.app.ENV === "dev" ? error : "",
  });
  return;
});

mainServer.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://${HOST}:${PORT}`);
});

export default app;
