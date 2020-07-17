import { Model } from "../models/model.model";

const djangoAppUrls = function (models: Model[]) {
  return `
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from . import views
from . import api

urlpatterns = [
    # Auth
    path('token-auth', obtain_jwt_token),
    path('token-refresh', refresh_jwt_token),

    # API
    ${models.map((model) => model.getListApiPath()).join("\n")}
    ${models.map((model) => model.getDetailApiPath()).join("\n")} 
]
  `;
};

export { djangoAppUrls };
