from django.db import models
from . import CtResult


class OriginalImage(models.Model):
    imgUrl = models.CharField()
    ct_result = models.OneToOneField(CtResult, on_delete=models.CASCADE)


class LimeImage(models.Model):
    imgUrl = models.CharField()
    ct_result = models.OneToOneField(CtResult, on_delete=models.CASCADE)
