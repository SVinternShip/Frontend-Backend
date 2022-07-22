from django.urls import path
from .api import file
from .api import patient_result_view
from .api import ct_result_view

urlpatterns = [
    path('fileUpload/<int:patient_result_id>', file.dicom_file_upload),
    path('patientResult', patient_result_view.PatientResultList.as_view()),
    path('patientResult/order/createdDate', patient_result_view.order_createdDate),
    path('patientResult/<int:patient_result_id>', patient_result_view.PatientResultDetail.as_view()),
    path('patientResult/<int:patient_result_id>/note', patient_result_view.save_note),
    path('storeResult', ct_result_view.store_predict_result),
    path('ctResult/<int:id>', ct_result_view.CTResultDetail.as_view()),
    path('ctResult/<int:id>/original', ct_result_view.get_original_result_image),
    path('ctResult/<int:id>/lime', ct_result_view.get_lime_result_image),
]
