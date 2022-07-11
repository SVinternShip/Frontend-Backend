from django.urls import path
from . import views


app_name = 'doctor'

urlpatterns = [
    path('signup', views.signup),
    path('login', views.Login.as_view()),
    path('logout', views.logout),
]