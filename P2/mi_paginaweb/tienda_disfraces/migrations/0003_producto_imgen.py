# Generated by Django 2.2.10 on 2020-03-09 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tienda_disfraces', '0002_producto_size'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='imgen',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]
