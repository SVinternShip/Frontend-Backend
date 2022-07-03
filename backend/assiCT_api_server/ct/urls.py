from django.urls import path
from .api import file_upload
from .api import patient_result_view

urlpatterns = [
    path('fileUpload', file_upload.dicom_file_upload),
    path('patientResult', patient_result_view.PatientResultList.as_view()),
    path('patientResult/<int:id>', patient_result_view.PatientResultDetail.as_view()),
]
