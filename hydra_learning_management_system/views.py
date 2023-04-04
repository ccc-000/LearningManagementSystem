import json

from django.http import JsonResponse
# Create your views here.
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import *

uid = 0


# Note: The decorator must be included because we don't
# have CSRF token in the header

@csrf_exempt
def log_in(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
        user = [username, password]
        uid = users.objects.get(username=username).uid
        if user is not None:
            return JsonResponse({'status': True, 'msg': 'Log in Success', 'uid': uid})
        else:
            return JsonResponse({'status': False, 'msg': 'Log in Fail'})


@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        email = data['email']
        role = data['role']
        user = users.objects.create(username=username, password=password, email=email, role=role)
        return JsonResponse({'status': True, 'msg': 'Register Success'})


@csrf_exempt
def forget_pwd_send_link(request):
    return


@csrf_exempt
def createcourses(request):
    if request.method == "POST":
        course_info = json.loads(request.body)
        coursename = course_info['coursename']
        creatorname = course_info['creatorname']
        creatorid = users.objects.get(username=creatorname)
        enrolllist = json.dump([creatorid])
        cousedecription = course_info['cousedecription']
        gradedistribution = course_info['gradedistribution']
        course = courses.objects.create(coursename=coursename, creatorid=creatorid, enrolllist=enrolllist,
                                        cousedecription=cousedecription, gradedistribution=gradedistribution)
        all_courses = courses.objects.get(creatorid=creatorid)
        if course:
            return JsonResponse({'status': 200, "courses": all_courses})
        else:
            return JsonResponse({'status': 500})


@csrf_exempt
def enrollcourses(request):
    MAX_SEAT = 46
    if request.method == "POST":
        data = json.loads(request.body)
        cid = data['cid']
        uid = data['uid']
        enrolllist = courses.objects.get(cid=cid)['']
        enrolllist = json.loads(enrolllist)
        available = MAX_SEAT - len(enrolllist)
        if available > 0:
            enrollment = enrollments.objects.create(cid=cid, uid=uid)
            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 500})


@csrf_exempt
def createdcouress(request):
    if request.method == "GET":
        data = json.loads(request.headers)
        creatorid = data["uid"]
        createdcouress = courses.objects.get(creatorid=creatorid)
    return JsonResponse({"courses": createdcouress})


@csrf_exempt
def dropcourses(request):
    if request.method == "POST":
        data = json.loads(request.body)
        cid = data['cid']
        uid = data['uid']
        course = courses.objects.get(cid=cid)
        course.delete()
        enrollment = enrollments.objects.get(cid=cid)
        enrollment.delete()
        return JsonResponse({'status': 200})


@csrf_exempt
def createdcourses(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data['uid']
        course = courses.objects.get(creatorid=uid)
        return {"courses": course}


@csrf_exempt
def enrolledcourses(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data['uid']
        cid = enrollments.objects.get(uid=uid).cid
        for i in cid:
            course = courses.objects.get(cid=i)
        return JsonResponse({"courses": course})


@csrf_exempt
def createquiz(request):
    return HttpResponse()


@csrf_exempt
def attendquiz(request):
    return HttpResponse()


@csrf_exempt
def markquiz(request):
    return HttpResponse()


@csrf_exempt
def reviewquiz(request):
    return HttpResponse()


@csrf_exempt
def createass(request):
    return HttpResponse()


@csrf_exempt
def submitass(request):
    return HttpResponse()


@csrf_exempt
def markass(request):
    return HttpResponse()


@csrf_exempt
def grade(request):
    return HttpResponse()


@csrf_exempt
def grade(request):
    return HttpResponse()


@csrf_exempt
def forum(request):
    return HttpResponse()


@csrf_exempt
def posts(request):
    return HttpResponse()


@csrf_exempt
def createposts(request):
    if request.method == "POST":
        data = json.loads(request.body)
        creatorid = data['creatorid']
        cid = data['cid']
        title = data['title']
        content = data['content']
        createtime = data['createtime']
        keyword = data['keyword']
        multimedia = data['multimeida']
        replyments = json.dump([])
        likes = json.dump([])
        editted = False
        flagged = json.dump([])
        privacy = json.dump([])
        post = posts.objects.create(creatorid=creatorid, cid=cid, createtime=createtime, keyword=keyword, title=title
                                    , content=content, multimedia=multimedia, replyments=replyments, likes=likes,
                                    editted=editted, flagged=flagged, privacy=privacy)
        if post is not None:
            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 500})

    return HttpResponse()


@csrf_exempt
def replyposts(request):
    return HttpResponse()


@csrf_exempt
def likeposts(request):
    return HttpResponse()


@csrf_exempt
def setprivate(request):
    return HttpResponse()


@csrf_exempt
def deleteposts(request):
    return HttpResponse()


@csrf_exempt
def deletereplys(request):
    return HttpResponse()
