from rest_framework import serializers
from backend.assiCT_api_server.ct.models.patientResult import PatientResult
from backend.assiCT_api_server.ct.models.ctResult import CtResult


class CtResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = CtResult
        fields = '__all__'


class PatientResultSerializer(serializers.ModelSerializer):
    sub_images = CtResultSerializer(many=True)

    class Meta:
        model = PatientResult
        fields = '__all__'
