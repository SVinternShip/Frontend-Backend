from django.urls import path
from . import views

urlpatterns = [
    path('fileUpload', views.dicom_file_upload),
]
