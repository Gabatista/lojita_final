from django.db import models
from django.contrib.auth.models import User

class Produto(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    nome = models.CharField(max_length=200, null=True, blank=True)
    imagem = models.ImageField(null=True, blank=True, default='/placeholder.png')
    marca = models.CharField(max_length=200, null=True, blank=True)
    categoria = models.CharField(max_length=200, null=True, blank=True)
    descricao = models.TextField(null=True, blank=True)
    avaliacao = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    num_avaliacoes = models.IntegerField(null=True, blank=True, default=0)
    preco = models.DecimalField(max_digits=7, decimal_places=2, blank=True)
    num_estoque = models.IntegerField(null=True, blank=True, default=0)
    criado_em = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.nome

class Analise(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.SET_NULL, null=True)
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    nome = models.CharField(max_length=200, null=True, blank=True)
    avaliacao = models.IntegerField(null=True, blank=True, default=0)
    comentario = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.avaliacao)

class Pedido(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    metodoPagamento = models.CharField(max_length=200, null=True, blank=True)
    imposto = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    frete = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    precoTotal = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    status_pagamento = models.BooleanField(default=False)
    pago_em = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    status_entregue = models.BooleanField(default=False)
    data_entrega = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.criado_em)

class ItemPedido(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.SET_NULL, null=True)
    pedido = models.ForeignKey(Pedido, on_delete=models.SET_NULL, null=True)
    nome = models.CharField(max_length=200, null=True, blank=True)
    qtd = models.IntegerField(null=True, blank=True, default=0)
    preco = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    imagem = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.nome)

class EnderecoEntrega(models.Model):
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, null=True, blank=True)
    endereco = models.CharField(max_length=200, null=True, blank=True)
    cidade = models.CharField(max_length=200, null=True, blank=True)
    cep = models.CharField(max_length=200, null=True, blank=True)
    pais = models.CharField(max_length=200, null=True, blank=True)
    frete = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.endereco)


