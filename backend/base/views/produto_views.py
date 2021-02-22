from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Produto
from base.serializers import ProdutoSerializer
from rest_framework import status

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