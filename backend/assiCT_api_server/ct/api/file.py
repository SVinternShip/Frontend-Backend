from django.http import Http404, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from ..models import PatientResult


def make_dicom_request(files):
    url = ''
    payload = {}
    request_files_list = []
    print("====" * 10)
    for idx, file in enumerate(files):
        # file = request.FILES.getlist("file")[idx]
        filename = file._name
        print(filename)
        # request_files_list.append(
        #    ('file', (filename, open('/Users/joonhyoungjeon/Downloads/ver_2.png', 'rb'), 'image/png')),
        # )
    # response = requests.request("POST", url, data=payload, files=files)
    response = "good"


def get_object(id):
    try:
        return PatientResult.objects.get(pk=id)
    except PatientResult.DoesNotExist:
        raise Http404


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dicom_file_upload(request, patient_result_id):
    if request.method == 'POST':
        patient_result = get_object(patient_result_id)
        patient_result.increase_total_dcm()
        response = make_dicom_request(request.FILES.getlist("file"))
    return JsonResponse({
        'task_id':'task_id'
    })
