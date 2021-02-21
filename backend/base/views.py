from django.shortcuts import render
from django.http import JsonResponse
from .produtos import produtos
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Produto
from .serializers import ProdutoSerializer


@api_view(['GET'])
def get_routes(request):
    routes = [
        'api/produtos/',
        'api/produtos/criar/',
        'api/produtos/enviar/',
        'api/produtos/<id>/avaliacoesq',
        'api/produtos/top/',
        'api/produtos/<id>/',
        'api/produtos/delete/<id>/',
        'api/produtos/<atualiza>/<id>/',
    ]
    return Response(routes)


@api_view(['GET'])
def get_produtos(request):
    produtos = Produto.objects.all()
    serializer = ProdutoSerializer(produtos, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_produto(request, pk):
    produto = Produto.objects.get(_id=pk)
    serializer = ProdutoSerializer(produto, many=False)
    return Response(serializer.data)