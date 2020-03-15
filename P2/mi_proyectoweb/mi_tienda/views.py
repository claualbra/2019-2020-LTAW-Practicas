from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from tienda_disfraces.models import Disfraces_Halloween, Disfraces_Navidad, Disfraces_Ninos
# Create your views here.
# -- Vista principal de mi tienda de disfraces
def index(request):
    return render(request, 'index.html', {})
def halloween(request):
    productos = Disfraces_Halloween.objects.all()
    return render(request, 'halloween.html', {'productos':productos})
def navidad(request):
    productos = Disfraces_Navidad.objects.all()
    return render(request, 'navidad.html', {'productos':productos})
def ninos(request):
    productos = Disfraces_Ninos.objects.all()
    return render(request, 'ninos.html', {'productos':productos})
