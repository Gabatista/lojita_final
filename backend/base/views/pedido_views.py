from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Produto, Pedido, ItemPedido, EnderecoEntrega
from base.serializers import ProdutoSerializer, PedidoSerializer
from rest_framework import status
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addItensPedido(request):
    usuario = request.user
    data = request.data
    itensPedido = data['itensPedido']

    if itensPedido and len(itensPedido) == 0:
        return Response({'detail':'Sem Pedidos no carrinho'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1 criar pedido
        pedido = Pedido.objects.create(
            usuario=usuario,
            metodoPagamento=data['metodoPagamento'],
            frete=data['frete'],
            precoTotal=data['precoTotal']
        )

        # 2 criar endereco entrega
        entrega = EnderecoEntrega.objects.create(
            pedido=pedido,
            endereco=data['enderecoEntrega']['endereco'],
            cidade=data['enderecoEntrega']['cidade'],
            cep=data['enderecoEntrega']['cep']
        )

        # 3 criar itens do pedido e criar relação entre pedido e item pedido
        for i in itensPedido:
            produto = Produto.objects.get(_id=i['produto'])

            item = ItemPedido.objects.create(
                produto=produto,
                pedido=pedido,
                nome=produto.nome,
                qtd=i['qtd'],
                preco=i['preco'],
                imagem=produto.imagem.url,
            )

        # 4 atualizar estoque
            produto.num_estoque -= item.qtd
            produto.save()

        serializer = PedidoSerializer(pedido, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMeusPedidos(request):
    usuario = request.user
    pedidos = usuario.pedido_set.all()
    serializer = PedidoSerializer(pedidos, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPedidoById(request, pk):
    usuario = request.user

    try:
        pedido = Pedido.objects.get(_id=pk)

        if usuario.is_staff or pedido.ususario == usuario:
            serializer = PedidoSerializer(pedido, many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Sessão não autorizada'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Pedido não existe'},status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def AtualizaParaPago(request, pk):
    pedido = Pedido.objects.get(_id=pk)

    pedido.status_pagamento = True
    pedido.pago_em = datetime.now()
    pedido.save()
    return Response('Pedido foi pago')



