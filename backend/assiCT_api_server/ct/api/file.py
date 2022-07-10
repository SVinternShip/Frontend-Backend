import environ
from django.http import Http404, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import PatientResult

env = environ.Env()
ml_server_host = env("ML_SERVER")


def make_dicom_request(files, patient_result_id):
    payload={'patient_result': patient_result_id}
    print("====" * 10)
    print(files)
    # response = requests.request("POST", ml_server_host, data=payload, files=files)
    response = "good"
    return response


def get_object(id):
    try:
        return PatientResult.objects.get(pk=id)
    except PatientResult.DoesNotExist:
        raise Http404

def check_file(files):
    if len(files) > 1 or files[0].name.split('.')[-1] != 'dcm':
        return False
    return True


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dicom_file_upload(request, patient_result_id):
    if request.method == 'POST':
        print(request.FILES.getlist('file'))
        print(request.FILES)
        if not check_file(request.FILES.getlist('file')):
            return Response("Only one dcm file should be sent", status=status.HTTP_400_BAD_REQUEST)

        response = make_dicom_request(request.FILES, patient_result_id)
        patient_result = get_object(patient_result_id)
        patient_result.increase_total_dcm()
    return JsonResponse({
        'task_id': response
    })
