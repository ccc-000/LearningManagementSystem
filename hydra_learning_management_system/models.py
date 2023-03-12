import uuid

from django.db import models

# Create your models here.

class User_info(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    e_mail = models.CharField(max_length=20)
    user_name = models.CharField(max_length=20)
    pwd = models.CharField(max_length=20)
    role = models.CharField(max_length=10)
    phone = models.IntegerField()
    address = models.CharField(max_length=50)
    #preferred_language = models.CharField(max_length=10)
    #rolment_history =
    def __str__(self):
        return self.user_name

class Course_db(models.Model):
    cid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course_name = models.CharField(max_length=20)
    description = models.CharField(max_length=50)
