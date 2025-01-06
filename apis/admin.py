from django.contrib import admin
from .models import Document, BankAccount


class DocumentAdmin(admin.ModelAdmin):
    list_display = ['user', 'document', 'name', 'created_at', 'updated_at']


class BankAccountAdmin(admin.ModelAdmin):
    list_display = ['user', 'bank_name', 'money', 'created_at', 'updated_at']

admin.site.register(Document, DocumentAdmin)
admin.site.register(BankAccount, BankAccountAdmin)


