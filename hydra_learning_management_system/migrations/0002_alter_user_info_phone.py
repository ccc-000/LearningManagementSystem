# Generated by Django 4.1.7 on 2023-03-12 01:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hydra_learning_management_system', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_info',
            name='phone',
            field=models.IntegerField(),
        ),
    ]
