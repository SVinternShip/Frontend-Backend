from django.db import models
from .patientResult import PatientResult


# Create your models here.
class CtResult(models.Model):
    prediction = models.BooleanField()
    patient_result = models.ForeignKey(PatientResult, on_delete=models.CASCADE)
