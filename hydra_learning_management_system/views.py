import datetime
import json
from django.core import serializers
from django.http import JsonResponse
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import *


# Create your views here.

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
        if username == "hayden" or username == "Katrina":
            return JsonResponse({'status': True, 'msg': 'Log in Success', 'uid': uid, "role": "lector"})
        if user is not None:
            return JsonResponse({'status': True, 'msg': 'Log in Success', 'uid': uid, "role":"student"})
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
        enrolllist = json.dump({"enrolllist": [creatorid]})
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
        course = courses.objects.get(creatorid=creatorid)
    return JsonResponse({"courses": course})


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
        return JsonResponse({"courses": course})


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
    if request.method == "POST":
        data = json.loads(request.body)
        ddl = data["ddl"]
        q1 = data["q1"]
        q2 = data["q2"]
        q3 = data["q3"]
        ans = data["ans"]
        quiz = quizzes.objects.create(ddl=ddl, q1=q1, q2=q2, q3=q3, ans=ans)
        if quiz is not None:
            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 403})


@csrf_exempt
def attendquiz(request):
    if request.method == "POST":
        data = json.loads(request.body)
        qid = data['q1']
        # {q1:A}
        q1 = data["q1"]
        q2 = data["q2"]
        q3 = data["q3"]
        ans = json.dumps({q1, q2, q3})
        rightans = quizzes.objects.get(qid=qid).ans
        if ans == rightans:
            return JsonResponse({"grade": 3})
        else:
            return JsonResponse({"grade": 0})


@csrf_exempt
def reviewquiz(request):
    return HttpResponse()


@csrf_exempt
def createass(request):
    if request.method == "POST":
        data = json.loads(request.body)
        ddl = data["ddl"]
        url = data["url"]
        quiz = assignments.objects.create(ddl=ddl, url = url)
        if quiz is not None:
            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 403})


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
def postes(request):
    if request.method == "POST":
        data = json.loads(request.body)
        pid = data['pid']
        reply = replyment.objects.filter(pid=pid)
        reply_info = serializers.serialize('python', reply)
        r=[]
        for i in reply_info:
            print(i)
        return JsonResponse({"reply": reply})


@csrf_exempt
def forum(request):
    if request.method == "POST":
        data = json.loads(request.body)
        cid = data['cid']
        post = posts.objects.filter(cid=cid)
        post_info = serializers.serialize('python',post)
        p = []
        for i in post_info:
            i["fields"]["pid"] = i["pk"]
            i = i["fields"]
            i["flagged"] = json.loads(i["flagged"])
            i["likes"] = json.loads(i["likes"])
            i["privacy"] = json.loads(i["privacy"])
            i["replyments"] = json.loads(i["replyments"])
            uid = i["creatorid"]
            creatorname = users.objects.get(uid=uid).username
            i["creatorname"] = creatorname
            p.append((i))
    return JsonResponse({"posts": p})


@csrf_exempt
def createposts(request):
    now = datetime.date.today()
    if request.method == "POST":
        data = json.loads(request.body)
        creatorid = data['creatorid']
        cid = data['cid']
        cid = courses.objects.get(cid=cid)
        creatorid = users.objects.get(uid=creatorid)
        title = data['title']
        content = data['content']
        createtime = now
        keyword = data['keyword']
        multimedia = data['multimedia']
        replyments = json.dumps({"replyments": {}})
        likes = json.dumps({"likes": []})
        editted = False
        flagged = json.dumps({"flagged": []})
        privacy = json.dumps({"privacy": []})
        post = posts.objects.create(creatorid=creatorid, cid=cid, createtime=createtime, keyword=keyword, title=title
                                    , content=content, multimedia=multimedia, replyments=replyments, likes=likes,
                                    editted=editted, flagged=flagged, privacy=privacy)
        if post is not None:
            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 500})


@csrf_exempt
def replyposts(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data["uid"]
        pid = data['pid']
        content = data['content']
        reply = replyment.objects.create(pid=pid, creator_id=uid, content=content)
        replylist = posts.objects.get(pid=pid).replyments
        replylist = json.loads(replylist)
        replylist["uid"] = content
        if reply is not None:
            return JsonResponse({"status": 200})
        else:
            return JsonResponse({"status": 403})


@csrf_exempt
def likeposts(request):
    if request.method == "POST":
        data = json.loads(request.body)
        pid = data["pid"]
        uid = data["uid"]
        likes = posts.objects.get(pid=pid).likes
        if uid in likes['like']:
            likes["likes"].remove(uid)
            return JsonResponse({"status": 200})
        else:
            likes['likes'].append(uid)
            return JsonResponse({"status": 200})


@csrf_exempt
def setprivate(request):
    if request.method == "POST":
        data = json.loads(request.body)
        pid = data["pid"]
        uid = data["uid"]
        ownerid = posts.objects.get(pid=pid).creatorid
        cid = posts.objects.get(pid=pid).cid
        lectorid = courses.objects.get(cid=cid).creatorid
        if uid == ownerid or uid == lectorid:
            privacy = posts.objects.get(pid=pid).privacy
            privacy = {"privacy": [uid, lectorid]}
        else:
            return JsonResponse({"status": 403})


@csrf_exempt
def deleteposts(request):
    if request.method == "DELETE":
        data = json.loads(request.body)
        pid = data["pid"]
        uid = data["uid"]
        post = posts.objects.get(pid=pid)
        if post is not None:
            post.delete()
            return JsonResponse({"status": 200})
        else:
            return JsonResponse({"status": 403})


@csrf_exempt
def deletereplys(request):
    if request.method == "DELETE":
        data = json.loads(request.body)
        pid = data["pid"]
        uid = data["uid"]
        reply = replyment.objects.get(uid=uid)
        replylist = posts.objects.get(pid=pid).replyments
        replylist =[]
        if reply is not None:
            reply.delete()

            return JsonResponse({"status": 200})
        else:
            return JsonResponse({"status": 403})


@csrf_exempt
def uploadmaterial(request):
    if request.method == "POST":
        data = json.loads(request.body)
        mid = data["mid"]
        type = data["type"]
        cid = data["cid"]
        filepath = data["filepath"]
        materials = material.objects.create(mid=mid, type=type, cid=cid, filepath=filepath)
        if materials is not None:
            return JsonResponse({"status": 200})
        else:
            return JsonResponse({"status": 403})


@csrf_exempt
def downloadmaterial(request):
    if request.method == "POST":
        data = json.loads(request.body)
        mid = data["mid"]
        filepath = material.objects.get(mid=mid).fileapath
        if filepath is not None:
            return JsonResponse({"filepath": filepath})
        else:
            return JsonResponse({"status": 403})
