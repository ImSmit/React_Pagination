from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('apis.urls.user_urls')),
    path('api/document/', include('apis.urls.document_urls')),
    path('api/bank/', include('apis.urls.bank_urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
