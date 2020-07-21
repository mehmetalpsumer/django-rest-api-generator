import path from "path";
import express, { Request, Response } from "express";

import { Project } from "../models/project.model";
import { parseJsonProject } from "../helper";
import { BashHelper } from "../bash-helper.model";
import {
  djangoRequirements,
  dockerComposeContent,
  dockerfileContent,
  djangoAdmin,
  djangoSerializers,
  djangoApi,
  djangoAppUrls,
  djangoProjectUrls,
  djangoSettings,
  djangoUtils,
} from "../templates";

const router = express.Router();

router.post("/api/project", async (req: Request, res: Response) => {
  let project: Project = new Project(""); // avoid TS 'non-defined'
  try {
    project = parseJsonProject(req.body);
  } catch (err) {
    res.status(500).send({ message: "Error while parsing JSON." });
  }

  // Project create
  await BashHelper.createDirectory(project.projectDir, true);
  await BashHelper.createDjangoProject(project.projectDir, project.name);

  // requirements.txt
  await BashHelper.createFile(project.projectDir, "requirements.txt");
  await BashHelper.writeToFile(
    project.projectDir + "/requirements.txt",
    djangoRequirements
  );

  // Dockerfile
  await BashHelper.createFile(project.projectDir, "Dockerfile");
  await BashHelper.writeToFile(
    project.projectDir + "/Dockerfile",
    dockerfileContent(project.port)
  );

  // docker-compose.yml
  await BashHelper.createFile(project.projectDir, "docker-compose.yml");
  await BashHelper.writeToFile(
    project.projectDir + "/docker-compose.yml",
    dockerComposeContent(project.port)
  );

  // settings.py
  const settingsFileName = "settings.py";
  await BashHelper.createFile(
    project.projectDir + "/" + project.name,
    settingsFileName
  );
  await BashHelper.writeToFile(
    project.projectDir + "/" + project.name + "/" + settingsFileName,
    djangoSettings(project.name, project.app.name)
  );

  // urls.py
  const projectUrlsFileName = "urls.py";
  await BashHelper.createFile(
    project.projectDir + "/" + project.name,
    projectUrlsFileName
  );
  await BashHelper.writeToFile(
    project.projectDir + "/" + project.name + "/" + projectUrlsFileName,
    djangoProjectUrls(project.app.name)
  );

  /* App */
  const djangoApp = project.app;
  const djangoAppDir = project.projectDir + "/" + djangoApp.name;
  await BashHelper.createDirectory(djangoAppDir);
  await BashHelper.createDjangoApp(djangoAppDir, djangoApp.name);

  // admin.py
  await BashHelper.createFile(djangoAppDir, "admin.py");
  await BashHelper.writeToFile(
    djangoAppDir + "/admin.py",
    djangoAdmin(djangoApp.models)
  );

  // serializers.py
  const serializersFileName = "serializers.py";
  await BashHelper.createFile(djangoAppDir, serializersFileName);
  await BashHelper.writeToFile(
    djangoAppDir + "/" + serializersFileName,
    djangoSerializers(djangoApp.models)
  );

  // api.py
  const apiFileName = "api.py";
  await BashHelper.createFile(djangoAppDir, apiFileName);
  await BashHelper.writeToFile(
    djangoAppDir + "/" + apiFileName,
    djangoApi(djangoApp.models)
  );

  // urls.py
  const urlsFileName = "urls.py";
  await BashHelper.createFile(djangoAppDir, urlsFileName);
  await BashHelper.writeToFile(
    djangoAppDir + "/" + urlsFileName,
    djangoAppUrls(djangoApp.models)
  );

  // JWT
  const utilsFileName = "utils.py";
  await BashHelper.createFile(djangoAppDir, utilsFileName);
  await BashHelper.writeToFile(djangoAppDir + "/" + utilsFileName, djangoUtils);

  /* Models */
  const modelsFilePath = djangoAppDir + "/models.py";
  djangoApp.models.forEach(async (model) => {
    await BashHelper.writeToFile(modelsFilePath, model.toString(), true);
  });

  // format PEP8
  await BashHelper.formatProjectWithAutopep8(project.projectDir);

  // compress
  await BashHelper.compressDirectory(project.projectDir);

  try {
    res.status(201).sendFile(`${project.projectName}.zip`, {
      root: path.join(__dirname, "../../projects"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
      },
    });
  } catch (err) {
    res.status(500).send({ message: "Error while sending the zip file." });
  }
});

router.get("/api/project", async (req: Request, res: Response) => {
  res.send({ message: "GET on this route is not allowed." });
});

export { router as projectRouter };
