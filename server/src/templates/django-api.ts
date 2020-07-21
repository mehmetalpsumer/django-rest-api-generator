import { Model } from "../models/model.model";

const djangoApi = function (models: Model[]) {
  return `
from django.http import JsonResponse
from django.db import transaction

from rest_framework import generics, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from . import models
from . import serializers

${models.map((model) => model.toListApiString()).join("\n")}

${models.map((model) => model.toDetailApiString()).join("\n")}
  `;
};

export { djangoApi };
