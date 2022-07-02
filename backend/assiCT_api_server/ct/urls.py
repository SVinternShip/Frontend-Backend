from django.urls import path
from .api import file_upload

urlpatterns = [
    path('fileUpload', file_upload.dicom_file_upload),
]
