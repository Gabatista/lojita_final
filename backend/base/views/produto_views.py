from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from base.models import Produto, Analise
from base.serializers import ProdutoSerializer
from rest_framework import status

@api_view(['GET'])
def get_produtos(request):
    query = request.query_params.get('keyword')
    if query == None:
        busca = ''

    produtos = Produto.objects.filter(nome__icontains=busca).order_by('-criado_em')
    page = request.query_params.get('page')
    paginator = Paginator(produtos, 5)

    try:
        produtos = paginator.page(page)
    except PageNotAnInteger:
        produtos = paginator.page(1)
    except EmptyPage:
        produtos = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = ProdutoSerializer(produtos, many=True)
    return Response({'produtos': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getTopProdutos(request):
    produtos = Produto.objects.filter(avaliacao__gte=4).order_by('-avaliacao')[0:5]
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def criarProdutoAnalise(request, pk):
    usuario = request.user
    produto = Produto.objects.get(_id=pk)
    data = request.data

    #analise já existe
    jaExiste = produto.avaliacao_set.filter(usuario=usuario).exists()

    if jaExiste:
        conteudo = {'detail':'Produto já analisado'}
        return Response(conteudo, status=status.HTTP_400_BAD_REQUEST)

    #cliente enviou sem analise ou 0
    elif data['avaliacao'] == 0:
        conteudo = {'detail':'Por favor deixe uma nota'}
        return Response(conteudo, status=status.HTTP_400_BAD_REQUEST)

    #criar analise
    else:
        analise = Analise.objects.create(
            usuario=usuario,
            produto=produto,
            nome=usuario.first_name,
            avaliacao=data['avaliacao'],
            comentario=data['comentario']
        )

        analises = produto.avaliacao_set.all()
        produto.num_avaliacoes = len(analises)

        total = 0
        for t in analises:
            total += t.avaliacao
        produto.avaliacao = total / len(analises)
        produto.save()

        return Response('Análise enviada')
