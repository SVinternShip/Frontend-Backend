from rest_framework import serializers
from ..models.patientResult import PatientResult
from ..models.ctResult import CtResult
from ..models.ctImage import *


class CtImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CtImage
        fields = '__all__'


class CtResultSerializer(serializers.ModelSerializer):
    ct_img = CtImageSerializer(many=False, read_only=True)

    class Meta:
        model = CtResult
        fields = '__all__'

    def create(self, validated_data, original_url, lime_url):
        patient_id = validated_data.pop('patient_result')[0]
        prediction = validated_data.pop('prediction')[0]
        patientName = validated_data.pop('patientName')[0]
        fileName = validated_data.pop('fileName')[0]
        studyDate = validated_data.pop('studyDate')[0]
        ct_img = CtImage.objects.create(original_imgUrl=original_url, lime_imgUrl=lime_url)
        patient_result = PatientResult.objects.get(pk=patient_id)
        patient_result.patientName = patientName
        patient_result.increase_complete_dcm()
        ctResult = CtResult.objects.create(ct_img=ct_img, patient_result=patient_result,fileName=fileName,
                                           prediction=prediction, studyDate=studyDate)

        return ctResult


class PatientResultSerializer(serializers.ModelSerializer):
    ct_results = CtResultSerializer(many=True, read_only=True)

    class Meta:
        model = PatientResult
        fields = '__all__'
