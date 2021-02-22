from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('api/', include('base.urls')),
    path('api/produtos/', include('base.urls.produto_urls')),
    path('api/users/', include('base.urls.usuario_urls')),
    path('api/pedidos/', include('base.urls.pedido_urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

