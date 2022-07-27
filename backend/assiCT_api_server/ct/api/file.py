import environ
from asgiref.sync import sync_to_async
from django.http import Http404, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import requests
from ..models import PatientResult

env = environ.Env()
ml_server_host = env("ML_SERVER")


def make_dicom_request(files, patient_result_id):
    payload={'patient_result': patient_result_id}
    try:
        response = requests.request("POST", "http://"+ml_server_host+"/ct/storeResult", data=payload, files=files)
    except Exception as e:
        raise Exception


def check_file(files):
    if len(files) > 1 or files[0].name.split('.')[-1] != 'dcm':
        return False
    return True


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dicom_file_upload(request, patient_result_id):
    '''
        환자의 DICOM 파일 업로드 하는 API

        ___
        # 내용
            - id : Patient Result Key value
    '''
    if request.method == 'POST':
        if not check_file(request.FILES.getlist('file')):
            return Response("Only one dcm file should be sent", status=status.HTTP_400_BAD_REQUEST)
        try:
            sync_to_async(make_dicom_request(request.FILES, patient_result_id), thread_sensitive=True)
        except Exception as e:
            return Response("Cannot connect to ML server", status=status.HTTP_404_NOT_FOUND)
    return Response("File Uploaded", status=status.HTTP_201_CREATED)
