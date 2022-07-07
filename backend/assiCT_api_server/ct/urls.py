from django.urls import path
from .api import file
from .api import patient_result_view
from .api import ct_result_view

urlpatterns = [
    path('fileUpload/<int:patient_result_id>', file.dicom_file_upload),
    path('patientResult', patient_result_view.PatientResultList.as_view()),
    path('patientResult/<int:patient_result_id>', patient_result_view.PatientResultDetail.as_view()),
    path('storeResult', ct_result_view.PredictResult.as_view()),
    path('ctResult/<int:id>', ct_result_view.CTResultDetail.as_view()),
    path('ctResult/<int:id>/original', ct_result_view.get_original_result_image),
    path('ctResult/<int:id>/lime', ct_result_view.get_lime_result_image),
]
