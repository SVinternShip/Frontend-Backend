from rest_framework import serializers
from ..models.patientResult import PatientResult
from ..models.ctResult import CtResult


class CtResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = CtResult
        fields = '__all__'


class PatientResultSerializer(serializers.ModelSerializer):
    sub_images = CtResultSerializer(many=True, required=False)

    class Meta:
        model = PatientResult
        fields = '__all__'
