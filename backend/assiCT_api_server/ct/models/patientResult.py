from django.db import models

# Create your models here.
class PatientResult(models.Model):
    createdDate = models.DateTimeField(auto_now_add=True)
    patientName = models.CharField(max_length=10)
    studyDate = models.DateTimeField(auto_now_add=True)
    note = models.CharField(max_length=256)