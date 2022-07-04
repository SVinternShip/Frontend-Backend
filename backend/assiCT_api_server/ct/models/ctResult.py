from django.db import models
from .patientResult import PatientResult
from .ctImage import *


# Create your models here.
class CtResult(models.Model):
    prediction = models.BooleanField()
    patient_result = models.ForeignKey(PatientResult, on_delete=models.CASCADE, related_name="ct_results")
    ct_img = models.OneToOneField(CtImage, on_delete=models.CASCADE, related_name="ct_result", default=None)
