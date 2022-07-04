from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
import requests

def make_dicom_request(files):
    url = ''
    payload = {}
    request_files_list = []
    print("===="*10)
    for idx, file in enumerate(files):
        #file = request.FILES.getlist("file")[idx]
        print(file)
        filename = file._name
        print(filename)
        #request_files_list.append(
        #    ('file', (filename, open('/Users/joonhyoungjeon/Downloads/ver_2.png', 'rb'), 'image/png')),
        #)
    #response = requests.request("POST", url, data=payload, files=files)
    response = "good"

@api_view(['POST'])
@csrf_exempt
def dicom_file_upload(request):
  if request.method == 'POST':
      response = make_dicom_request(request.FILES.getlist("file"))
  return HttpResponse("response")


@api_view(['GET'])
@csrf_exempt
def dicom_file_upload(request):
  if request.method == 'POST':
      response = make_dicom_request(request.FILES.getlist("file"))
  return HttpResponse("response")

