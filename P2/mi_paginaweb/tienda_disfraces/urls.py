from django.urls import path

# -- Importar todas las vistas de tienda_disfraces
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Metemos de momento sólo la principal (índice)

urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),
    #--vista de los disfraces de halloween
    path('halloween.html/', views.halloween, name='halloween'),
    #--vista de los disfraces de navidad
    path('navidad.html/', views.navidad, name='navidad'),
    #--vista de los disfraces de niños
    path('ninos.html/', views.ninos, name='ninos'),
    #--vista para el formulario de pedidos
    path('formulario/', views.formulario, name='formulario'),
    #--vista de la recpción del pedido
    path('recepcion/', views.recepcion, name='reception'),
]
