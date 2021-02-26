from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Produto, Pedido, ItemPedido, EnderecoEntrega


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    itensPedido = serializers.SerializerMethodField(read_only=True)
    enderecoEntrega = serializers.SerializerMethodField(read_only=True)
    usuario = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Pedido
        fields = '__all__'

    def get_itensPedido(self, obj):
        itens = obj.itempedido_set.all()
        serializer = ItemPedidoSerializer(itens, many=True)
        return serializer.data

    def get_enderecoEntrega(self, obj):
        try:
            endereco = EnderecoEntregaSerializer(obj.enderecoEntrega, many=False).data
        except:
            endereco = False
        return endereco

    def get_usuario(self, obj):
        usuario = obj.usuario
        serializer = UserSerializer(usuario, many=False)
        return serializer.data


class EnderecoEntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnderecoEntrega
        fields = '__all__'


class ItemPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemPedido
        fields = '__all__'


