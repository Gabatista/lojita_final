from django.urls import path
from base.views import usuario_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registraUsuario, name='register'),

    path('profile/', views.get_user_perfil, name="users-profiles"),
    path('', views.get_usuarios, name="users"),
]