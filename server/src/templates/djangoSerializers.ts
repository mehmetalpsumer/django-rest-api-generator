import { Model } from "../models/model.model";

const djangoSerializers = function (models: Model[]) {
  return `
    from rest_framework import serializers
    from django.contrib.auth.models import User
    from . import models

    ${models
      .map((model) => model.toSerializerString())
      .join("\n")}
  `;
};

export { djangoSerializers };
