import { App } from "./app.model";
import { CommonFieldOptions } from "./field.model";
import { slugify } from "../helper";

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


  public get projectName() {
    return `${this.name}_${this.timestamp}`;
  }

  public get projectDir() {
    return `${projectsRoot}/${this.projectName}`;
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
