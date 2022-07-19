from django.views import View
from django.http import Http404
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.patientResult import PatientResult
from ..serializer.serializer import PatientResultSerializer
from django.contrib.auth import get_user_model


Doctor = get_user_model()
@permission_classes([IsAuthenticated])
class PatientResultList(APIView):

    def get(self, request):
        '''
            환자들 결과 리스트를 조회하는 API

            ___
            # 내용
                - 파라미터 : 없음
        '''
        try:
            patient_result_list = PatientResult.objects.filter(user_id=request.user.id)
            serializer = PatientResultSerializer(patient_result_list, many=True)
            return Response(serializer.data)
        except PatientResult.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        '''
            환자들 결과 리스트를 갱신하는 API

            ___
            # 내용
                - 파라미터 : 없음
        '''
        try:
            user = Doctor.objects.get(id=request.user.id)
            patientResult = PatientResult(user=user)
            patientResult.save()
            serializer = PatientResultSerializer(patientResult)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Doctor.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class PatientResultDetail(APIView):

    def get_object(self, id):
        try:
            return PatientResult.objects.get(pk=id)
        except PatientResult.DoesNotExist:
            raise Http404

    def get(self, request, patient_result_id):
        '''
            해당 id 의 환자 결과를 조회하는 API

            ___
            # 내용
                - 파라미터 : 환자 id
        '''
        patient_result = self.get_object(patient_result_id)
        serializer = PatientResultSerializer(patient_result)
        return Response(serializer.data)

    def put(self, request, patient_result_id):
        '''
            해당 id 의 환자 결과를 입력하는 API

            ___
            # 내용
                - 파라미터 : 환자 id
        '''
        patient_result = self.get_object(patient_result_id)
        serializer = PatientResultSerializer(patient_result, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, patient_result_id):
        '''
            해당 id 의 환자 결과를 삭제하는 API

            ___
            # 내용
                - 파라미터 : 환자 id
        '''
        patient_result = self.get_object(patient_result_id)
        patient_result.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
