from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Produto


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        field = '__all__'