import path from "path";
import express, { Request, Response } from "express";

import { Project } from "../models/project.model";
import { parseJsonProject } from "../helper";


const router = express.Router();

router.post("/api/project", async (req: Request, res: Response) => {
  let project: Project;
  try {
    project = parseJsonProject(req.body);
  } catch (err) {
    res.status(500).send({ err });
  }

  var options = {
    root: path.join(__dirname, "../../projects"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  
  try {
    const zipFileDir = await project!.create();
    const zipFileName  = zipFileDir.split("/").pop()!;
    res.status(201).sendFile(zipFileName, options);
  } catch(err) {
    res.status(500).send({ message: "Error while sending the zip file." });
  }
  
});

router.get("/api/project", async (req: Request, res: Response) => {
  res.send({message: "GET on this route is not allowed."})
});

export { router as projectRouter };
