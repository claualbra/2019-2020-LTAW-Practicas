from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
# Create your views here.
# -- Vista principal de mi tienda de disfraces
def index(request):
    return render(request, 'index.html', {})
def halloween(request):
    return render(request, 'halloween.html', {})
def navidad(request):
    return render(request, 'navidad.html', {})
def ninos(request):
    return render(request, 'ninos.html', {})
