const djangoProjectUrls = function(appName: string) {
  return `
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Swagger')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('${appName}.urls')),
    url(r'^swagger/', schema_view),
]
  `;
}

export { djangoProjectUrls };