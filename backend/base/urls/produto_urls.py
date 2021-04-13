from django.urls import path
from base.views import produto_views as views


urlpatterns = [
    path('', views.get_produtos, name="produtos"),
    path('criar/', views.criar_produto, name="produto-criar"),
    path('upload/', views.enviarImagem, name="enviar-imagem"),
    path('<str:pk>/analises/', views.criarProdutoAnalise, name="criar-analise"),
    path('top/', views.getTopProdutos, name="top-produtos"),
    path('<str:pk>/', views.get_produto, name="produto"),
    path('delete/<str:pk>/', views.delete_produto, name="produto-apagar"),
    path('update/<str:pk>/', views.atualiza_produto, name="produto-atualiza"),
]