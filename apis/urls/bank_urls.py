from django.urls import path
from apis.views import bank_views as views

urlpatterns = [
    path('create/', views.BankAccountView.as_view(), name="create_bank_account"),
    path('bank-accounts/', views.BankAccountView.as_view(), name="get_bank_accounts"),
    # path('delete/', views.deleteDocuments, name="delete_bank_accounts"),
    # path('update/<int:document_id>/', views.updateDocument, name="update_bank_account"),
]