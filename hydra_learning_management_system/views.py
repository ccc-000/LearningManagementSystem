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
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        email = data['email']
        role = data['role']
        user = Users.objects.create(username=username, password=password, email=email, role=role)
        return JsonResponse({'status': 200, 'msg': 'Register Success'})


@csrf_exempt
def log_in(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
        uid = Users.objects.get(username=username).uid
        rightpwd = Users.objects.get(username=username).password
        role = Users.objects.get(username=username).role
        if password == rightpwd:
            return JsonResponse({'status': 200, 'msg': 'Log in Success', 'uid': uid, "role": role})
        else:
            return JsonResponse({'status': 403, 'msg': 'Log in Fail'})


@csrf_exempt
def logout(request):
    if request.method == "GET":
        return JsonResponse({'status': 200})

@csrf_exempt
def editprofile(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data["uid"]
        user_info = Users.objects.get(uid=uid)
        username = user_info.username
        firstname = user_info.firstname
        lastname = user_info.lastname
        gender = user_info.gender
        birthday = user_info.birthday
        email = user_info.email
        preferedlanguage = user_info.preferredlanguage
        return JsonResponse({
            "Firstname": firstname,
            "Lastname": lastname,
            "gender": gender,
            "birthday": birthday,
            "email": email,
            "language": preferedlanguage
        })


@csrf_exempt
def forget_pwd_send_link(request):
    return


@csrf_exempt
def createcourses(request):
    if request.method == "POST":
        course_info = json.loads(request.body)
        coursename = course_info['coursename']
        creatorname = course_info['creatorname']
        creatorid = Users.objects.get(username=creatorname)
        crid = creatorid.uid
        enrolllist = json.dumps({"enrolllist": [crid]})
        coursedecription = course_info['coursedescription']
        gradedistribution = course_info['gradedistribution']
        course = Courses.objects.create(coursename=coursename, creatorid=creatorid, enrolllist=enrolllist,
                                        coursedescription=coursedecription, gradedistribution=gradedistribution)

        if course:
            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 403})





@csrf_exempt
def enrollcourses(request):
    # We assume the max enrollment of a course is 45 and the lecturer.
    MAX_SEAT = 46
    if request.method == "POST":
        data = json.loads(request.body)
        cid = data['cid']
        uid = data['uid']
        enrolllist = Courses.objects.get(cid=cid)['']
        enrolllist = json.loads(enrolllist)
        available = MAX_SEAT - len(enrolllist)
        if available > 0:
            enrollment = Enrollments.objects.create(cid=cid, uid=uid)
            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 500})


@csrf_exempt
def createdcourses(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data["uid"]
        courses = Courses.objects.filter(creatorid=uid)
        courses = serializers.serialize("python", courses)
        for i in courses:
            i = i["fields"]
        return JsonResponse({"courses": courses})


@csrf_exempt
def dropcourses(request):
    if request.method == "POST":
        data = json.loads(request.body)
        cid = data['cid']
        uid = data['uid']
        course = Courses.objects.get(cid=cid)
        course.delete()
        enrollment = Enrollments.objects.get(cid=cid)
        enrollment.delete()
        return JsonResponse({'status': 200})



@csrf_exempt
def enrolledcourses(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data['uid']
        cid = Enrollments.objects.filter(uid=uid).cid
        courses = []
        for i in cid:
            course = Courses.objects.get(cid=i)
            courses.append(course)
        courses = serializers.serialize("python", courses)
        return JsonResponse({"courses": courses})


@csrf_exempt
def createquiz(request):
    if request.method == "POST":
        data = json.loads(request.body)
        ddl = data["ddl"]
        q1 = data["q1"]
        q2 = data["q2"]
        q3 = data["q3"]
        ans = data["ans"]
        quiz = Quizzes.objects.create(ddl=ddl, q1=q1, q2=q2, q3=q3, ans=ans)
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
        rightans = Quizzes.objects.get(qid=qid).ans
        score = 0
        for i in range(len(ans)):
            if ans[i] == rightans[i]:
                score += 1
        return JsonResponse({"grade": score})


@csrf_exempt
def reviewquiz(request):
    return HttpResponse()


@csrf_exempt
def createass(request):
    if request.method == "POST":
        data = json.loads(request.body)
        title = data["title"]
        cid = data["cid"]
        url = data["url"]
        assdescription = data["assdescription"]
        ass = Assignments.objects.create(cid=cid, url=url, title=title, assignmentdescription=assdescription)
        if ass is not None:
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
        reply = Replies.objects.filter(pid=pid)
        reply_info = serializers.serialize('python', reply)
        r = []
        for i in reply_info:
            print(i)
        return JsonResponse({"reply": reply})


@csrf_exempt
def forum(request):
    if request.method == "POST":
        data = json.loads(request.body)
        cid = data['cid']
        post = Posts.objects.filter(cid=cid)
        post_info = serializers.serialize('python', post)
        p = []
        for i in post_info:
            i["fields"]["pid"] = i["pk"]
            i = i["fields"]
            i["flagged"] = json.loads(i["flagged"])
            i["likes"] = json.loads(i["likes"])
            i["privacy"] = json.loads(i["privacy"])
            i["replyments"] = json.loads(i["replyments"])
            uid = i["creatorid"]
            creatorname = Users.objects.get(uid=uid).username
            i["creatorname"] = creatorname
            p.append(i)
        return JsonResponse({"posts": p})


@csrf_exempt
def createposts(request):
    now = datetime.date.today()
    if request.method == "POST":
        data = json.loads(request.body)
        creatorid = data['creatorid']
        cid = data['cid']
        cid = Courses.objects.get(cid=cid)
        creatorid = Users.objects.get(uid=creatorid)
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
        post = Posts.objects.create(creatorid=creatorid, cid=cid, createtime=createtime, keyword=keyword, title=title
                                    , content=content, multimedia=multimedia, replyments=replyments, likes=likes,
                                    editted=editted, flagged=flagged, privacy=privacy)
        if post is not None:
            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 403})


@csrf_exempt
def replyposts(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data["uid"]
        pid = data['pid']
        content = data['content']
        reply = Replies.objects.create(pid=pid, creator_id=uid, content=content)
        replylist = Posts.objects.get(pid=pid).replyments
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
        likes = Posts.objects.get(pid=pid).likes
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
        ownerid = Posts.objects.get(pid=pid).creatorid
        cid = Posts.objects.get(pid=pid).cid
        lectorid = Courses.objects.get(cid=cid).creatorid
        if uid == ownerid or uid == lectorid:
            privacy = Posts.objects.get(pid=pid).privacy
            privacy = {"privacy": [uid, lectorid]}
        else:
            return JsonResponse({"status": 403})


@csrf_exempt
def deleteposts(request):
    if request.method == "DELETE":
        data = json.loads(request.body)
        pid = data["pid"]
        uid = data["uid"]
        post = Posts.objects.get(pid=pid)
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
        reply = Replies.objects.get(uid=uid)
        replylist = Posts.objects.get(pid=pid).replyments
        replylist = []
        if reply is not None:
            reply.delete()

            return JsonResponse({"status": 200})
        else:
            return JsonResponse({"status": 403})


@csrf_exempt
def uploadmaterial(request):
    if request.method == "POST":
        data = json.loads(request.body)
        type = data["type"]
        cid = data["cid"]
        course = Courses.objects.get(cid=cid)
        filepath = data["filepath"]
        materials = Materials.objects.create(type=type, cid=course, filepath=filepath)
        if materials is not None:
            return JsonResponse({"status": 200})
        else:
            return JsonResponse({"status": 403})


@csrf_exempt
def downloadmaterial(request):
    if request.method == "POST":
        data = json.loads(request.body)
        mid = data["mid"]
        filepath = Materials.objects.get(mid=mid).fileacopath
        if filepath is not None:
            return JsonResponse({"filepath": filepath})
        else:
            return JsonResponse({"status": 403})


@csrf_exempt
def showmaterial(request):
    if request.method == "POST":
        data = json.loads(request.body)
        cid = data["cid"]
        materials = Materials.objects.filter(cid=cid)
        m = serializers.serialize("python", materials)
        res = []
        for i in m:
            i["fields"]['mid'] = i['pk']
            i = i["fields"]
            print(i)
            res.append(i)
        return JsonResponse({"material": res})
