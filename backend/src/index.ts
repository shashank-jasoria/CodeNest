import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import { compileAndRun } from "./controllers/CompileAndRun";
import { healthChecks } from "./controllers/HealthCheck";
const app = express();
const port = 3300;
import path from "path";

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());

app.get("/healthCheck", healthChecks);

app.post("/compileAndRun", compileAndRun);

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "../../dist")));

app.use((req, res, next) => {
  if (req.url.endsWith(".css")) {
    res.type("text/css");
  }
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

server.listen(port, `0.0.0.0`, () => {
  console.log("Running on Port: ", port);
});
