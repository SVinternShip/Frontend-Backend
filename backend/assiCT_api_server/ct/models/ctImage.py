from django.db import models


class CtImage(models.Model):
    original_imgUrl = models.CharField(max_length=128)
    lime_imgUrl = models.CharField(max_length=128)


