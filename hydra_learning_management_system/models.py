from django.db import models

# Create your models here.

class User_info(models.Model):
    e_mail = models.CharField(max_length=20)
    user_name = models.CharField(max_length=20)
    pwd = models.CharField(max_length=20)
    preferred_language = models.CharField(max_length=10)
