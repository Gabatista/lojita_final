# Generated by Django 3.1.7 on 2021-02-25 14:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_auto_20210225_1049'),
    ]

    operations = [
        migrations.RenameField(
            model_name='itempedido',
            old_name='quantidade',
            new_name='qtd',
        ),
    ]