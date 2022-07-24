from channels.exceptions import StopConsumer
from django.db import models

# Create your models here.
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


class ChatConsumer(WebsocketConsumer):

    def connect(self):
        user = self.scope['user']
        async_to_sync(self.channel_layer.group_add)(str(user.id), self.channel_name)
        self.accept()


    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(str(self.scope["user"].id), self.channel_name)
        raise StopConsumer()

    def chat_message(self, event):
        self.send(text_data=event["text"])