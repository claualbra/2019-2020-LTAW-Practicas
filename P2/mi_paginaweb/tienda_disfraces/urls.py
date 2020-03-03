from django.urls import path

# -- Importar todas las vistas de tienda_disfraces
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Metemos de momento sólo la principal (índice)

urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),
    path('halloween.html/', views.halloween, name='halloween'),
    path('navidad.html/', views.navidad, name='navidad'),
    path('ninos.html/', views.ninos, name='ninos'),
    path('list_halloween/', views.list_halloween, name='list_halloween'),
]
