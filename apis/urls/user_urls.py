from django.urls import path
from apis.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name="get_user"),
    path('update/', views.updateUsers, name="update_user"),
    path('get/', views.getUsers, name="get_users")
]