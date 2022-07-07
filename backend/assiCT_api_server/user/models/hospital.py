from django.db import models


class Hospital(models.Model):
    hospitalCode = models.CharField(max_length=50, unique=True)
    hospitalName = models.CharField(max_length=200)
    hospitalAddress = models.CharField(max_length=300)
