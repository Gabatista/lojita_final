from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.serializers import ProdutoSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registraUsuario(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detalhe':'Esse e-mail já está associado a uma conta'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_perfil(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_usuarios(request):
    usuarios = User.objects.all()
    serializer = UserSerializer(usuarios, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_usuario_by_Id(request, pk):
    usuario = User.objects.get(id=pk)
    serializer = UserSerializer(usuario, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_usuario(request, pk):
    usuario = User.objects.get(id=pk)

    data = request.data
    usuario.first_name = data['name']
    usuario.username = data['email']
    usuario.email = data['email']
    usuario.is_staff = data['isAdmin']

    usuario.save()
    serializer = UserSerializer(usuario, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_perfil(request):
    usuario = request.user
    serializer = UserSerializerWithToken(usuario, many=False)
    data = request.data

    usuario.first_name = data['name']
    usuario.username = data['email']
    usuario.email = data['email']

    if data['password'] != '':
        usuario.password = make_password(data['password'])

    usuario.save()
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUsuario(request, pk):
    usuarioApagar = User.objects.get(id=pk)
    usuarioApagar.delete()
    return Response('Usuário apagado')