from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from tienda_disfraces.models import Producto
# Create your views here.
# -- Vista principal de mi tienda de disfraces
def index(request):
    return render(request, 'index.html', {})
def halloween(request):
    productos = Producto.objects.all()
    return render(request, 'halloween.html', {'productos':productos})
def navidad(request):
    return render(request, 'navidad.html', {})
def ninos(request):
    return render(request, 'ninos.html', {})
def list_halloween(request):
    productos = Producto.objects.all()
    return render(request, 'listado_halloween.html', {'productos':productos})
