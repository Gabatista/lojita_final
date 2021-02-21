from django.contrib import admin
from .models import *

admin.site.register(Produto)
admin.site.register(Analise)
admin.site.register(Pedido)
admin.site.register(ItemPedido)
admin.site.register(EnderecoEntrega)
