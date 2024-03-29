"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url

urlpatterns = [
    # path('api/admin/', admin.site.urls),
    path('api/ct/', include('ct.urls')),
    path('api/user/', include('doctor.urls')),
    url('prometheus/', include('django_prometheus.urls'))
]

from django.urls import path, include

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="assiCT_api_server",
        default_version='0.0.1',
        description="assiCT_api_server 의 API 문서",
        terms_of_service="",
        contact=openapi.Contact(email="이메일"),  # 부가정보
        license=openapi.License(name="mit"),  # 부가정보
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

# drf_yasg url 
urlpatterns += [
    path('api/swagger<str:format>', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
