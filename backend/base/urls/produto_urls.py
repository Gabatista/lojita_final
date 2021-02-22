from django.urls import path
from base.views import produto_views as views


urlpatterns = [
    path('', views.get_produtos, name="produtos"),
    path('<str:pk>/', views.get_produto, name="produto"),
]