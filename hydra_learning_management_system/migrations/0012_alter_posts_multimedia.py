# Generated by Django 4.1.7 on 2023-04-16 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hydra_learning_management_system', '0011_alter_assessments_grade'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='multimedia',
            field=models.TextField(default=''),
        ),
    ]