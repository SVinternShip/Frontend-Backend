from django.db import models
from django.conf import settings


# Create your models here.

class PatientResult(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="patient_results")
    createdDate = models.DateTimeField(auto_now_add=True)
    patientName = models.CharField(max_length=256, blank=True)
    note = models.CharField(max_length=256, blank=True)
    total_dcm = models.IntegerField(default=0)
    complete_dcm = models.IntegerField(default=0)

    def increase_total_dcm(self):
        self.total_dcm = self.total_dcm + 1
        self.save()

    def increase_complete_dcm(self):
        self.complete_dcm = self.complete_dcm + 1
        self.save()
