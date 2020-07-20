import { writeFileSync, readFileSync, write } from "fs";
import { App } from "./app.model";
import { CommonFieldOptions } from "./field.model";
import { djangoSettings } from "../templates/djangoSettings";
import { djangoRequirements } from "../templates/djangoRequirements";
import { dockerfileContent } from "../templates/docker";
import { dockerComposeContent } from "../templates/dockerCompose";
import { djangoProjectUrls } from "../templates/djangoProjectUrls";
import { execCmd, slugify } from "../helper";

const projectsRoot = "./projects";

class Project {
  name: string;
  app: App;
  port: number;
  dbUser: string;
  dbPassword: string;
  timestamp: number;

  constructor(
    name: string,
    port: number = 7080,
    dbUser: string = "postgres",
    dbPassword: string = "postgres"
  ) {
    this.name = slugify(name);
    this.port = port;
    this.dbUser = dbUser;
    this.dbPassword = dbPassword;
    this.app = new App("dummy");
    this.timestamp = new Date().getTime();
  }

  public async createProjectDirectory(projectDir: string): Promise<void> {
    const cmd = ["mkdir", "-p", projectDir];
    const action = "Create project directory";
    await execCmd(cmd, action);
  }

  public async createRequirements(projectDir: string): Promise<void> {
    const fileDir = `${projectDir}/requirements.txt`;
    const cmd = ["touch", fileDir];
    const action = "Create requirements.txt";
    await execCmd(cmd, action);

    console.log("=> Writing to requirements.txt...");
    writeFileSync(fileDir, djangoRequirements);
    console.log("=> Requirements.txt finished successfuly.");
  }

  public async createDockerFile(projectDir: string): Promise<void> {
    const fileDir = `${projectDir}/Dockerfile`;
    const cmd = ["touch", fileDir];
    const action = "Create Dockerfile";
    await execCmd(cmd, action);

    console.log("=> Writing Dockerfile settings...");
    writeFileSync(fileDir, dockerfileContent(this.port));
    console.log("=> Dockerfile finished successfuly.");
  }

  public async createDockerComposeFile(projectDir: string): Promise<void> {
    const fileDir = `${projectDir}/docker-compose.yml`;
    const cmd = ["touch", fileDir];
    const action = "Create docker-compose.yml";
    await execCmd(cmd, action);

    console.log("=> Writing to Docker Compose...");
    writeFileSync(
      fileDir,
      dockerComposeContent(this.port, this.dbUser, this.dbPassword)
    );
    console.log("=> Docker Compose file finished successfuly.");
  }

  public async createDjangoProject(projectDir: string): Promise<void> {
    const cmd = ["django-admin", "startproject", this.name, projectDir];
    const action = "Create Django app";
    await execCmd(cmd, action);
  }

  public async writeSettings(projectDir: string): Promise<void> {
    const settingsStr = djangoSettings(this.name, this.app?.name);

    const settingsPath = `${projectDir}/${this.name}/settings.py`;
    writeFileSync(settingsPath, settingsStr);
  }

  public async writeUrls(projectDir: string): Promise<void> {
    const urlsPath = `${projectDir}/${this.name}/urls.py`;
    const content = djangoProjectUrls(this.app.name);
    writeFileSync(urlsPath, content);
  }

  public async formatProjectDocuments(projectDir: string): Promise<void> {
    const cmd = ["autopep8", "--in-place", "--recursive", projectDir];
    const action = "Format Django files";
    await execCmd(cmd, action);
  }

  public async compressProjectDir(projectDir: string): Promise<void> {
    const zipCmd = ["zip", "-r", `${projectDir}.zip`, projectDir];
    await execCmd(zipCmd, "Zip project directory");
    const removeDirCmd = ["rm", "-rf", projectDir];
    //await execCmd(removeDirCmd, "Remove project directory");
  }

  public async create(): Promise<string> {
    const projectName = `${this.name}_${this.timestamp}`;
    const projectDir = `${projectsRoot}/${projectName}`;

    // Create project directory
    await this.createProjectDirectory(projectDir);

    // Create Django project
    await this.createDjangoProject(projectDir);

    // Write project requirements
    await this.createRequirements(projectDir);

    // Docker files
    await this.createDockerFile(projectDir);
    await this.createDockerComposeFile(projectDir);

    // Trigger app creation
    await this.app.create(projectName);

    // Write project settings
    await this.writeSettings(projectDir);
    await this.writeUrls(projectDir);

    // PEP8 format files
    await this.formatProjectDocuments(projectDir);
    await this.compressProjectDir(projectDir);
    return `${projectDir}.zip`;
  }
}

interface ProjectJson {
  name: string;
  port: number;
  app: {
    name: string;
    models: {
      name: string;
      fields: {
        commonOptions: CommonFieldOptions;
        hasDefault?: boolean;
        defaultValue?: any;
        maxLength?: number;
        model?: string;
        onDelete?: string;
        autoNow?: boolean;
        autoNowAdd?: boolean;
        maxDigits?: number;
        decimalPlaces?: number;
        uploadTo?: string;
      }[];
    }[];
  };
}

export { Project, ProjectJson, projectsRoot };
