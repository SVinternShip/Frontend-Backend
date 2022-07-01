from rest_framework import serializers
from backend.assiCT_api_server.ct.models.patientResult import PatientResult
from backend.assiCT_api_server.ct.models.ctResult import CtResult


class PatientResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientResult


class CtResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = CtResult
