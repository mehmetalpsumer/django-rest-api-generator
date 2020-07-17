import express, { Request, Response } from "express";

import { Project } from "../models/project.model";
import { parseJsonProject } from "../helper";

const router = express.Router();

router.post("/api/project", async (req: Request, res: Response) => {
  let project: Project;
  try {
    project = parseJsonProject(req.body);
    project.app.models.forEach((model) => console.log(model));
  } catch (err) {
    res.status(500).send({ err });
  }
  const zipFileName = await project!.create();
  res.status(201).sendFile(zipFileName);
});

export { router as projectRouter };
