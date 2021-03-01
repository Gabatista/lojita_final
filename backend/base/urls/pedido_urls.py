from django.urls import path
from base.views import pedido_views as views


urlpatterns = [
    path('', views.getPedidos, name='pedidos'),
    path('add/', views.addItensPedido, name='pedidos-add'),
    path('meuspedidos/', views.getMeusPedidos, name='meuspedidos'),
    path('<str:pk>/entregue', views.AtualizaParaEntregue, name='pedido-entregue'),
    path('<str:pk>/', views.getPedidoById, name='pedidos-usuario'),
    path('<str:pk>/pagar/', views.AtualizaParaPago, name='pagar'),
]