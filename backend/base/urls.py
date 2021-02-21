from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_routes, name="routes"),
    path('produtos/', views.get_produtos, name="produtos"),
    path('produto/<str:pk>/', views.get_produto, name="produto"),

]