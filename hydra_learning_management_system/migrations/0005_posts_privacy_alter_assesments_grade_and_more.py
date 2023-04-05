# Generated by Django 4.1.7 on 2023-04-04 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hydra_learning_management_system', '0004_assignments_courses_posts_quizzes_replyment_material_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='posts',
            name='privacy',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='assesments',
            name='grade',
            field=models.JSONField(default=dict),
        ),
        migrations.RemoveField(
            model_name='courses',
            name='enrolllist',
        ),
        migrations.AlterField(
            model_name='courses',
            name='gradedistribution',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='posts',
            name='content',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='posts',
            name='createtime',
            field=models.DateField(),
        ),
        migrations.RemoveField(
            model_name='posts',
            name='flagged',
        ),
        migrations.AlterField(
            model_name='posts',
            name='keyword',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='posts',
            name='likes',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='posts',
            name='multimedia',
            field=models.TextField(),
        ),
        migrations.RemoveField(
            model_name='posts',
            name='replyments',
        ),
        migrations.AlterField(
            model_name='posts',
            name='title',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='quizzes',
            name='q1',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='quizzes',
            name='q2',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='quizzes',
            name='q3',
            field=models.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name='courses',
            name='enrolllist',
            field=models.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name='posts',
            name='flagged',
            field=models.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name='posts',
            name='replyments',
            field=models.JSONField(default=dict),
        ),
    ]
