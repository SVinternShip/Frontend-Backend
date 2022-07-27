from django.views import View
from django.http import Http404, JsonResponse
from rest_framework.decorators import permission_classes, api_view
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.patientResult import PatientResult
from ..serializer.serializer import PatientResultSerializer
from django.contrib.auth import get_user_model

Doctor = get_user_model()


def get_object(id):
    try:
        return PatientResult.objects.get(pk=id)
    except PatientResult.DoesNotExist:
        raise Http404

def order_by_createdDate(user_id):
    try:
        return PatientResult.objects.filter(user_id=user_id).order_by('-createdDate')
    except PatientResult.DoesNotExist:
        raise Http404


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_patient_result(request, total_dcm_num):
    '''
        현재 로그인한 Docter에게 Patient Result 객체 생성

        ___
        # 내용
            - 파라미터 : 없음
    '''
    try:
        user = Doctor.objects.get(id=request.user.id)
        patientResult = PatientResult(user=user, total_dcm=total_dcm_num)
        patientResult.save()
        serializer = PatientResultSerializer(patientResult)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
class PatientResultList(APIView):

    def get(self, request):
        '''
            현재 로그인한 Doctor의 모든 환자들 결과 리스트를 조회하는 API

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

@permission_classes([IsAuthenticated])
class PatientResultDetail(APIView):

    def get(self, request, patient_result_id):
        '''
            해당 key의 Patient Result GET API

            ___
            # 내용
                - 파라미터 : Patient Result Key value
        '''
        patient_result = get_object(patient_result_id)
        serializer = PatientResultSerializer(patient_result)
        return Response(serializer.data)

    def put(self, request, patient_result_id):
        '''
            해당 key의 Patient Result PUT API

            ___
            # 내용
                - 파라미터 : Patient Result Key value
        '''
        patient_result = get_object(patient_result_id)
        serializer = PatientResultSerializer(patient_result, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, patient_result_id):
        '''
            해당 key의 Patient Result DELETE API

            ___
            # 내용
                - 파라미터 : Patient Result Key value
        '''
        patient_result = get_object(patient_result_id)
        patient_result.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_note(request, patient_result_id):
    '''
        Patient Result의 Note 변경

        ___
        # 내용
            - id : Patient Result Key value
    '''
    if request.method == 'POST':
        data = JSONParser().parse(request)
        patient_result = get_object(patient_result_id)
        patient_result.note = data["note"]
        patient_result.save()
        return JsonResponse({
            "note": patient_result.note,
            "id": patient_result.id
        })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_createdDate(request):
    '''
        현재 로그인한 사용자의 Patient Result를 생성 시간 순서로 정렬

        ___
       # 내용
            - 파라미터 : 없음
    '''
    if request.method == 'GET':
        try:
            user_id = request.user.id
            patient_result_list = order_by_createdDate(user_id)
            serializer = PatientResultSerializer(patient_result_list, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)