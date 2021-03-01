from django.urls import path
from base.views import usuario_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registraUsuario, name='register'),

    path('profile/', views.get_user_perfil, name="users-profiles"),
    path('profile/update/', views.update_perfil, name="update-user-profile"),
    path('', views.get_usuarios, name="users"),
    path('<str:pk>/', views.get_usuario_by_Id, name="user"),
    path('delete/<str:pk>/', views.deleteUsuario, name="user-delete"),
    path('update/<str:pk>/', views.update_usuario, name="user-update"),
]