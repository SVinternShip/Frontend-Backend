from django.db import models
from user.models.user import User


# Create your models here.

class PatientResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="patient_results")
    createdDate = models.DateTimeField(auto_now_add=True)
    patientName = models.CharField(max_length=10, blank=True)
    studyDate = models.DateTimeField(auto_now_add=True, blank=True)
    note = models.CharField(max_length=256, blank=True)
    total_dcm = models.IntegerField(default=0)
    complete_dcm = models.IntegerField(default=0)

    def increase_total_dcm(self):
        self.total_dcm = self.total_dcm + 1
        self.save()

    def increase_complete_dcm(self):
        self.complete_dcm = self.complete_dcm + 1
        self.save()
