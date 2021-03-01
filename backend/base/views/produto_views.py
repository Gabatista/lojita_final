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


@api_view(['POST'])
@permission_classes([IsAdminUser])
def criar_produto(request):
    usuario = request.user
    produto = Produto.objects.create(
        usuario=usuario,
        nome='Nome',
        preco=0,
        marca='Marca',
        num_estoque=1,
        categoria='Categoria',
        descricao='Descrição'
    )

    serializer = ProdutoSerializer(produto, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_produto(request, pk):
    produto = Produto.objects.get(_id=pk)
    produto.delete()
    return Response('Produto apagado')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def atualiza_produto(request, pk):
    data = request.data
    produto = Produto.objects.get(_id=pk)
    produto.nome = data['nome']
    produto.preco = data['preco']
    produto.marca = data['marca']
    produto.categoria = data['categoria']
    produto.num_estoque = data['num_estoque']
    produto.descricao = data['descricao']
    produto.save()
    serializer = ProdutoSerializer(produto, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def enviarImagem(request):
    data = request.data
    produto_id = data['produto_id']
    produto = Produto.objects.get(_id=produto_id)
    produto.imagem = request.FILES.get('imagem')
    produto.save()
    return Response('Imagem enviada')