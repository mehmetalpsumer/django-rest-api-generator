import { slugify } from "../helper";
import { Model } from "./model.model";

class App {
  name: string;
  models: Model[];

  constructor(name: string, models: Model[] = []) {
    this.name = slugify(name);
    this.models = models;
  }
}

export { App };
