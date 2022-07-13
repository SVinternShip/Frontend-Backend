import tempfile
from datetime import datetime

from django.http import Http404, FileResponse
from django.views.decorators.csrf import csrf_exempt
from google.cloud import storage
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.ctResult import CtResult
from ..models.patientResult import PatientResult
from ..serializer.serializer import CtResultSerializer

bucket_name = 'sv_internship_image'  # 서비스 계정 생성한 bucket 이름 입력
storage_client = storage.Client()
bucket = storage_client.bucket(bucket_name)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_original_result_image(request, id):
    if request.method == 'GET':
        CtResult = get_ct_result_object(id)
        original_file_name = CtResult.ct_img.original_imgUrl
        blob = bucket.blob(original_file_name)
        fp = tempfile.TemporaryFile()
        blob.download_to_file(fp)
        fp.seek(0)
        original_file_name = original_file_name.split('_')[2:]
        fileResponse = FileResponse(fp, filename=original_file_name[0])
        return fileResponse


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_lime_result_image(request, id):
    if request.method == 'GET':
        CtResult = get_ct_result_object(id)
        lime_file_name = CtResult.ct_img.lime_imgUrl
        blob = bucket.blob(lime_file_name)
        fp = tempfile.TemporaryFile()
        blob.download_to_file(fp)
        fp.seek(0)
        lime_file_name = lime_file_name.split('_')[2:]
        fileResponse = FileResponse(fp, filename=lime_file_name[0])
        return fileResponse


def get_ct_result_object(id):
    try:
        return CtResult.objects.get(pk=id)
    except CtResult.DoesNotExist:
        raise Http404


def get_patient_result_object(id):
    try:
        return PatientResult.objects.get(pk=id)
    except PatientResult.DoesNotExist:
        raise Http404


def store_image_to_gc(request):
    original_img = request.FILES['original_image']
    lime_img = request.FILES['lime_image']
    # GCP에 업로드할 파일 절대경로
    now = str(datetime.datetime.now())
    original_img_name = now + '_original_' + str(original_img.name)  # 업로드할 파일을 GCP에 저장할 때의 이름

    blob = bucket.blob(original_img_name)
    blob.upload_from_file(original_img, rewind=True)

    lime_img_name = now + '_lime_' + str(lime_img.name)  # 업로드할 파일을 GCP에 저장할 때의 이름

    blob = bucket.blob(lime_img_name)
    blob.upload_from_file(lime_img, rewind=True)
    return original_img_name, lime_img_name

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def store_predict_result(request):
    original_img_url, lime_img_url = store_image_to_gc(request)
    serializer = CtResultSerializer(data=request.data)
    if serializer.is_valid(raise_exception=ValueError):
        serializer.create(validated_data=request.data, original_url=original_img_url, lime_url=lime_img_url)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class CTResultDetail(APIView):

    def get(self, request, id):
        ct_result = get_ct_result_object(id)
        serializer = CtResultSerializer(ct_result)
        return Response(serializer.data)

    def put(self, request, id):
        ct_result = get_ct_result_object(id)
        serializer = CtResultSerializer(ct_result, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        ct_result = get_ct_result_object(id)
        ct_result.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
