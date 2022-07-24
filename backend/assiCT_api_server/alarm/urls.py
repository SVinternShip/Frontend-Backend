from django.urls import re_path

from . import models

websocket_urlpatterns = [
    re_path(r'ws/alarm', models.ChatConsumer()),
]
