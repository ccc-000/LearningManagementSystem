# Generated by Django 4.1.7 on 2023-04-04 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hydra_learning_management_system', '0005_posts_privacy_alter_assesments_grade_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignments',
            name='ddl',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='assignments',
            name='url',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='material',
            name='fileapath',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='material',
            name='type',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='quizzes',
            name='ans',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='quizzes',
            name='ddl',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='replyment',
            name='content',
            field=models.TextField(),
        ),
    ]
