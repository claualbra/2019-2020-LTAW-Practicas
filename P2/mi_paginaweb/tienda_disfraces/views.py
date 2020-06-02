from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from tienda_disfraces.models import Disfraces_Halloween, Disfraces_Navidad, Disfraces_Ninos, Pedido
# Create your views here.
# -- Vista principal de mi tienda de disfraces
def index(request):
    return render(request, 'index.html', {})
#--vista de los disfraces de halloween
def halloween(request):
    productos = Disfraces_Halloween.objects.all()
    return render(request, 'halloween.html', {'productos':productos})
#--vista de los disfraces de navidad
def navidad(request):
    productos = Disfraces_Navidad.objects.all()
    return render(request, 'navidad.html', {'productos':productos})
#--vista de los disfraces de niños
def ninos(request):
    productos = Disfraces_Ninos.objects.all()
    return render(request, 'ninos.html', {'productos':productos})
#--vista para el formulario de pedidos
def formulario(request):
    return render(request, 'formulario.html', {})
#--vista de la recpción delpedido
def recepcion(request):
    # -- Obtener el nombre de la persona
    persona = request.POST['nombre']
    #-- Obtener articulo
    articulo = request.POST['articulo']
    p = Pedido(nombre=persona, articulo=articulo)
    p.save()
    # -- Imprimirlo en la consola del servidor
    print(f" PEDIDO RECIBIDO!!! ----> {persona}")
    print(f" PEDIDO RECIBIDO!!! ----> {articulo}")

    return render(request, 'recepcion.html', {'persona':persona, 'articulo':articulo})
