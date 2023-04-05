from django.db import models


# Create your models here.

class users(models.Model):
    uid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    role = models.CharField(max_length=10)

class courses(models.Model):
    cid = models.AutoField(primary_key=True)
    coursename = models.CharField(max_length=50)
    creatorid = models.ForeignKey(users, on_delete=models.CASCADE)
    enrolllist = models.TextField()
    coursedescription = models.TextField()
    gradedistribution = models.TextField()

class enrollments(models.Model):
    cid = models.ForeignKey(courses, on_delete=models.CASCADE)
    uid = models.ForeignKey(users, on_delete=models.CASCADE)


class assesments(models.Model):
    ####################################################################
    ## It should be uid - json(contains quiz grade infomation) table. ##
    ###################################################################
    uid = models.ForeignKey(users, on_delete=models.CASCADE)
    grade = models.TextField()


class quizzes(models.Model):
    qid = models.AutoField(primary_key=True)
    ddl = models.DateTimeField()
    q1 = models.TextField()
    q2 = models.TextField()
    q3 = models.TextField()
    ans = models.TextField()


class assignments(models.Model):
    aid = models.AutoField(primary_key=True)
    ddl = models.TextField()
    url = models.TextField()


class material(models.Model):
    mid = models.AutoField(primary_key=True)
    type = models.TextField()
    cid = models.ForeignKey(courses, on_delete=models.CASCADE)
    fileapath = models.TextField()


class posts(models.Model):
    pid = models.AutoField(primary_key=True)
    creatorid = models.ForeignKey(users, on_delete=models.CASCADE)
    cid = models.ForeignKey(courses, on_delete=models.CASCADE)
    createtime = models.DateField()
    keyword = models.TextField()
    title = models.TextField()
    content = models.TextField()
    multimedia = models.TextField()
    replyments = models.TextField()
    likes = models.TextField()
    editted = models.BooleanField()
    flagged = models.TextField()
    privacy = models.TextField()

class replyment(models.Model):
    pid = models.ForeignKey(posts, on_delete=models.CASCADE)
    creator_id = models.ForeignKey(users, on_delete=models.CASCADE)
    content = models.TextField()
