import { writeFileSync, copyFileSync } from "fs";
import { execCmd, slugify } from "../helper";
import { Model } from "./model.model";
import { projectsRoot } from "./project.model";
import { djangoAdmin } from "../templates/djangoAdmin";
import { djangoSerializers } from "../templates/djangoSerializers";
import { djangoApi } from "../templates/djangoApi";
import { djangoAppUrls } from "../templates/djangoAppUrls";

class App {
  name: string;
  models: Model[];

  constructor(name: string, models: Model[] = []) {
    this.name = slugify(name);
    this.models = models;
  }

  public async createAppDir(appDir: string) {
    const cmd = ["mkdir", appDir];
    const action = "Create app directory";
    await execCmd(cmd, action);
  }

  public async createApp(appDir: string) {
    const cmd = ["django-admin", "startapp", this.name, appDir];
    const action = "Create Django app";
    await execCmd(cmd, action);
  }

  public async createAdminFile(appDir: string) {
    const fileDir = `${appDir}/admin.py`;
    const cmd = ["touch", fileDir];
    const action = "Create admin.py";
    await execCmd(cmd, action);

    const content = djangoAdmin(this.models);
    writeFileSync(fileDir, content);
  }

  public async createSerializerFile(appDir: string) {
    const fileDir = `${appDir}/serializers.py`;
    const cmd = ["touch", fileDir];
    const action = "Create serializers.py";
    await execCmd(cmd, action);

    const content = djangoSerializers(this.models);
    writeFileSync(fileDir, content);
  }

  public async createApiFile(appDir: string) {
    const fileDir = `${appDir}/api.py`;
    const cmd = ["touch", fileDir];
    const action = "Create api.py";
    await execCmd(cmd, action);

    const content = djangoApi(this.models);
    writeFileSync(fileDir, content);
  }

  public async createUrlsFile(appDir: string) {
    const fileDir = `${appDir}/urls.py`;
    const cmd = ["touch", fileDir];
    const action = "Create urls.py";
    await execCmd(cmd, action);

    const content = djangoAppUrls(this.models);
    writeFileSync(fileDir, content);
  }

  public async copyJwtUtils(appDir: string): Promise<void> {
    console.log(appDir);
    copyFileSync("./src/templates/utils.py", appDir);
  }

  public async create(projectName: string): Promise<void> {
    const projectDir = `${projectsRoot}/${projectName}`;
    const appDir = `${projectDir}/${this.name}`;

    // Create app directory
    await this.createAppDir(appDir);

    // Create Django app
    await this.createApp(appDir);

    // Create files
    await this.createAdminFile(appDir);
    await this.createSerializerFile(appDir);
    await this.createApiFile(appDir);
    await this.createUrlsFile(appDir);

    // Trigger model creation
    for (let i = 0; i < this.models.length; i++) {
      const model = this.models[i];
      await model.create(projectName, this.name);
    }

    // Copy jwt utils
    await this.copyJwtUtils(`${appDir}/utils.py`);
  }
}

export { App };
