from django.db import models

# Create your models here.

class Disfraces_Halloween(models.Model):
    """Modelo de datos de mis productos"""

    nombre = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    precio = models.FloatField()
    SIZES = (
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
    )
    size = models.CharField(max_length=1, choices=SIZES)
    img = models.CharField(max_length=50)
    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.nombre

class Disfraces_Navidad(models.Model):
    """Modelo de datos de mis productos"""

    nombre = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    precio = models.FloatField()
    SIZES = (
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
    )
    size = models.CharField(max_length=1, choices=SIZES)
    img = models.CharField(max_length=50)
    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.nombre

class Disfraces_Ninos(models.Model):
    """Modelo de datos de mis productos"""

    nombre = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    precio = models.FloatField()
    SIZES = (
        ('XS', 'Xsmall'),
        ('S', 'Small'),
        ('M', 'Medium'),
    )
    size = models.CharField(max_length=2, choices=SIZES)
    img = models.CharField(max_length=50)
    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.nombre

class Pedido(models.Model):
    """Modelo de datos de mis productos"""
    nombre = models.CharField(max_length=50)
    articulo = models.CharField(max_length=50)
    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.nombre
