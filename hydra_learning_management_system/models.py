from django.db import models

# Create your models here.

class Users_info(models.Model):
    e_mail = models.CharField(max_length=50)
    user_name = models.CharField(max_length=50)
    pwd = models.CharField(max_length=50)
    role = models.CharField(max_length=20)