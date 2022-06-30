from django.db import models
from .patientResult import PatientResult


# Create your models here.
class CtResult(models.Model):
    prediction = models.BooleanField()
    imgDescription = models.CharField(max_length=256)
    patient_result = models.ForeignKey(PatientResult, on_delete=models.CASCADE)
