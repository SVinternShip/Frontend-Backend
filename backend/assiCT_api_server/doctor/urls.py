from django.urls import path
from . import views
from rest_framework_jwt.views import refresh_jwt_token

app_name = 'doctor'

urlpatterns = [
    path('signup', views.signup),
    path('login', views.Login.as_view()),
    path('logout', views.logout),
    path('token/refresh', refresh_jwt_token),
]
