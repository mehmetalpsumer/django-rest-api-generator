import { Model } from '../models/model.model';

const djangoAdmin = function (models: Model[]) {
  return `
from django.contrib import admin
from . import models

${models
  .map((model) => model.formatModelName(model.name))
  .map((name) => `admin.site.register(models.${name})`)
  .join("\n")}
  `;
};

export { djangoAdmin };
