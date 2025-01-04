from django.urls import path
from apis.views import document_views as views

urlpatterns = [
    path('create/', views.uploadDocument, name="upload_document"),
    path('documents/', views.getDocuments, name="get_documents"),
    path('search/', views.searchDocuments, name="search_documents"),
    path('delete/', views.deleteDocuments, name="delete_documents"),
    path('update/<int:document_id>/', views.updateDocument, name="update_document"),
    path('delete-all/', views.deleteAllDocuments, name="delete_all_documents"),
    # path('document/<int:document_id>/', views.deleteDocument, name="delete_document"),
]