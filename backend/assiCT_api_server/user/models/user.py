from django.contrib.auth.models import AbstractUser
from django.db import models

from .hospital import Hospital


class User(AbstractUser):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, verbose_name='소속 병원')
    username = models.CharField(max_length=50, unique=True, verbose_name='아이디')
    last_name = models.CharField(max_length=40, verbose_name='성')
    first_name = models.CharField(max_length=20, verbose_name='이름')
    password = models.CharField(max_length=200)

    REQUIRED_FIELDS = []
