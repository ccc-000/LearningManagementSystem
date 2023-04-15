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
def showprofile(request):
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
def editprofile(request):
    if request.method == "PUT":
        data = json.loads(request.body)
        uid = data["uid"]
        firstname = data["firstname"]
        lastname = data["lastname"]
        gender = data["gender"]
        birthday = data["birthday"]
        email = data["email"]
        language = data["preferedlanguage"]
        user = Users.objects.get(uid=uid)
        user.firstname = firstname
        user.lastname = lastname
        user.gender = gender
        user.birthday = birthday
        user.email = email
        user.preferredlanguage = language
        user.save()
        return JsonResponse({"status": 200})


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
        #enrolllist = json.dumps({"enrolllist": [crid]})
        coursedecription = course_info['coursedescription']
        gradedistribution = course_info['gradedistribution']
        course = Courses.objects.create(coursename=coursename, creatorid=creatorid,
                                        coursedescription=coursedecription, gradedistribution=gradedistribution)
        if course:
            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 403})


@csrf_exempt
def enrollcourses(request):
    # We assume the max enrollment of a course is 45.
    MAX_SEAT = 45
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data['uid']
        coursename = data['coursename']
        for i in coursename:
            course = Courses.objects.get(coursename=i)
            cid = course.cid
            uids = Enrollments.objects.filter(cid=cid)
            uids = serializers.serialize("python",uids)
            print(uids)
            uidss = []
            for i in uids:
                tmp = i["fields"]["uid"]
                uidss.append(tmp)
            #for i in uids:
            if uid in uidss:
                return JsonResponse({"status":500, "msg":"You have enrolled"})
            #print(uid)
            seat = len(uids)
            #enrolllist = course.enrolllist
            #enrolllist = json.loads(enrolllist)["enrolllist"]
            #print(enrolllist)
            available = MAX_SEAT - seat
            if available > 0:
                enroll_flag = Enrollments.objects.filter(cid=1)
                enroll_flag = serializers.serialize("python", enroll_flag)
                #print(enroll_flag)
                course = Courses.objects.get(cid=cid)
                user = Users.objects.get(uid=uid)
                enrollment = Enrollments.objects.create(cid=course, uid=user)
                assessment = Assessments.objects.create(uid=user,cid=course)
            else:
                return JsonResponse({"status": 500, "msg": f"The enrollment of {i} failed"})
        return JsonResponse({'status': 200})

@csrf_exempt
def createdcourses(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data["uid"]
        courses = Courses.objects.filter(creatorid=uid)
        courses = serializers.serialize("python", courses)
        course = []
        for i in courses:
            tmp = {}
            cid = i["pk"]
            tmp["coursename"] = i["fields"]["coursename"]
            tmp["coursedescription"] = i["fields"]["coursedescription"]
            tmp["coursedescription"] = i["fields"]["coursedescription"]
            tmp["cid"] = cid
            course.append(tmp)
        return JsonResponse({"courses": course})

@csrf_exempt
def showcourses(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data['uid']
        courses = Courses.objects.all()
        courses = serializers.serialize("python", courses)
        course = []
        for i in courses:
            creatorid = i["fields"]["creatorid"]
            creatorname = Users.objects.get(uid=creatorid).username
            i["fields"]["creatorname"] = creatorname
            i = i["fields"]
            course.append(i)
        #print(course)
        return JsonResponse({"courses": course})

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
        cid = Enrollments.objects.filter(uid=uid)
        cid = serializers.serialize("python", cid)
        #print(cid)
        cids = []
        for i in cid:
            tmp = i["fields"]["cid"]
            cids.append(tmp)
        #print(cids)
        courses = []
        for i in cids:
            course = Courses.objects.get(cid=i)
            course = serializers.serialize('python', [course])
            tmp = course[0]["fields"]
            tmp["cid"] = course[0]['pk']
            courses.append(tmp)
        print(courses)
        return JsonResponse({"courses": courses})


@csrf_exempt
def createquiz(request):
    if request.method == "POST":
        data = json.loads(request.body)
        ddl = data["ddl"]
        ##data["q1"] = str "{description: 1+1, A:2,b:3,c:4,d:5,ans: A}"
        ##data["q2"] = str "{description: 1+1, A:2,b:3,c:4,d:5,ans: AB}"
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
        uid = data['uid']
        cid = data["cid"]
        qid = data['qid']
        q1 = data["q1"]
        q2 = data["q2"]
        q3 = data["q3"]
        ans = json.dumps({q1, q2, q3})
        rightans = Quizzes.objects.get(qid=qid).ans
        score = 0
        for i in range(len(ans)):
            if ans[i] == rightans[i]:
                score += 1
        #存分
        course = Courses.objects.get(cid=cid)
        user = Users.objects.get(uid=uid)
        assessment = Assessments.objects.get(cid=course,uid=user)
        grade = assessment.grade
        grade = json.loads(grade)
        grade["quiz"]["qid"] = score
        grade = json.dumps(grade)
        assessment.grade = grade
        assessment.save()
        return JsonResponse({"status": 200})


@csrf_exempt
def reviewquiz(request):
    #在此查看quiz
    #CID UID QID
    #quiz info right ans
    if request.method == "POST":
        data = json.loads(request.body)
        cid = data["cid"]
        uid = data["uid"]
        qid = data["uid"]
        quiz = Quizzes.objects.get(qid=qid)
        quiz = serializers.serialize("python",quiz)
        quizes = []
        for i in quiz:
            tmp = i["fields"]
            quizes.append(tmp)
    return JsonResponse({"quiz":quizes})


@csrf_exempt
def createass(request):
    #git status
    if request.method == "POST":
        data = json.loads(request.body)
        title = data["title"]
        cid = data["cid"]
        course = Courses.objects.get(cid=cid)
        url = data["url"]
        assdescription = data["assdescription"]
        ass = Assignments.objects.create(cid=course, url=url, title=title, assignmentdescription=assdescription)
        if ass is not None:
            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 403})

@csrf_exempt
def showass(request):
    if request.method == "POST":
        data = json.loads(request.body)
        cid = data["cid"]
        asses = Assignments.objects.filter(cid=cid)
        asses = serializers.serialize("python", asses)
        ass = []
        for i in asses:
            tmp = {}
            tmp["assignemntdescription"] = i["fields"]["assignmentdescription"]
            tmp["cid"] = i["pk"]
            tmp["title"] = i["fields"]["title"]
            tmp["url"] = i["fields"]["url"]
            ass.append(tmp)
        return JsonResponse({"asses":ass})

@csrf_exempt
def submitass(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data["uid"]
        cid = data["cid"]
        aid = data['aid']
        ass = data["ass"]##link
        user = Users.objects.get(uid=uid)
        course = Courses.objects.get(cid=cid)
        assessment = Assessments.objects.get(uid=user,cid=course)
        worklink = assessment.worklink
        worklink = json.loads(worklink)
        worklink[aid] = ass
        worklink = json.dumps(worklink)
        assessment.worklink = worklink
        assessment.save()
        return JsonResponse({"status":200})


@csrf_exempt
def markass(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data["uid"]
        cid = data["cid"]
        aid = data["aid"]
        mark = data["mark"]
        user = Users.objects.get(uid=uid)
        course = Courses.objects.get(cid=cid)
        assessment = Assessments.objects.get(uid=user, cid=course)
        grade = assessment.grade
        grade = json.loads(grade)
        grade["ass"]["aid"] = mark
        grade = grade.dumps(grade)
        assessment.grade = grade
        assessment.save()
        return JsonResponse({"status": 200})


@csrf_exempt
def grade(request):
    return HttpResponse()

@csrf_exempt
def postes(request):
    if request.method == "POST":
        data = json.loads(request.body)
        pid = data['pid']
        post = Posts.objects.get(pid=pid)
        post = serializers.serialize("python", [post])
        post = post[0]
        uid = post["fields"]["creatorid"]
        creatorname = Users.objects.get(uid=uid).username
        post["fields"]["creatorname"] = creatorname
        post["fields"]["reply"] = json.loads(post["fields"]["reply"])
        post["fields"]["likes"] = json.loads(post["fields"]["likes"])
        post["fields"]["flagged"] = json.loads(post["fields"]["flagged"])["flagged"]
        post["fields"]["privacy"] = json.loads(post["fields"]["privacy"])["privacy"]
        post = post["fields"]
        #print(post)
        return JsonResponse(post)


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
            i["reply"] = json.loads(i["reply"])
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
        reply = json.dumps({"reply": {}})
        likes = json.dumps({"likes": []})
        editted = False
        flagged = json.dumps({"flagged": []})
        privacy = json.dumps({"privacy": []})
        post = Posts.objects.create(creatorid=creatorid, cid=cid, createtime=createtime, keyword=keyword, title=title
                                    , content=content, multimedia=multimedia, reply=reply, likes=likes,
                                    editted=editted, flagged=flagged, privacy=privacy)
        if post is not None:
            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 403})


@csrf_exempt
def editposts(request):
    if request.method == "PUT":
        data = json.loads(request.body)
        pid = data["pid"]
        post = Posts.objects.get(pid=pid)
        post.title = data["title"]
        post.content = data["content"]
        post.keyword = data["keyword"]
        post.multimedia = data["multimeida"]
        post.editted = True
        post.save()
        return JsonResponse({"status": 200, "msg":"edit success"})

@csrf_exempt
def flagposts(request):
    if request.method == "POST":
        data = json.loads(request.body)
        pid = data["pid"]
        uid = data["uid"]
        post = Posts.objects.get(pid=pid)
        flagged = post.flagged
        flagged = json.loads(flagged)
        if uid in flagged["flagged"]:
            flagged["flagged"].remove(uid)
            flagged = json.dumps(flagged)
            post.flagged = flagged
            post.save()
            return JsonResponse({"status": 200, "msg":"flag removes"})
        flagged["flagged"].appned(uid)
        flagged = json.dumps(flagged)
        post.flagged = flagged
        post.save()
        return JsonResponse({"status": 200, "msg":"flag success"})

@csrf_exempt
def replyposts(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uid = data["uid"]
        pid = data['pid']
        content = data['content']
        user = Users.objects.get(uid=uid)
        post = Posts.objects.get(pid=pid)
        reply = Replies.objects.create(pid=pid, creator_id=user, content=content)
        replylist = post.reply
        replylist = json.loads(replylist)
        replylist["reply"]["uid"] = content
        replylist = json.dumps(replylist)
        post.reply = replylist
        post.save()
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
        post = Posts.objects.get(pid=pid)
        likes =post.likes
        likes = json.loads(likes)
        if uid in likes['like']:
            likes["likes"].remove(uid)
            likes = json.dumps(likes)
            post.likes = likes
            post.save()
            return JsonResponse({"status": 200, "msg":"like remove"})
        else:
            likes['likes'].append(uid)
            likes = json.dumps(likes)
            post.likes = likes
            post.save()
            return JsonResponse({"status": 200, "msg":"like success"})


@csrf_exempt
def setprivate(request):
    if request.method == "POST":
        data = json.loads(request.body)
        pid = data["pid"]
        uid = data["uid"]
        post = Posts.objects.get(pid=pid)
        ownerid = post.creatorid
        cid = post.cid
        course = Courses.objects.get(cid=cid)
        lectorid = course.creatorid
        if uid == ownerid or uid == lectorid:
            privacy = not post.privacy
            if privacy == True:
                return JsonResponse({"status": 200, "msg": "privacy set"})
            else:
                return JsonResponse({"status": 200, "msg": "privacy unset"})
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
            res.append(i)
        return JsonResponse({"material": res})
