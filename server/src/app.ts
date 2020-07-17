import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { projectRouter } from './routes/project';
import { statusRouter } from './routes/status';
import { cat } from 'shelljs';

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.static("dist"));

// Routes
app.use(projectRouter);
app.use(statusRouter);

app.all("*", async (req, res) => {
  try {
    res.sendFile("../dist/index.html");
  } catch(error) {
    res.status(404).send({ error: error, message: 'Not found.' });
  }
  
});

export { app };
