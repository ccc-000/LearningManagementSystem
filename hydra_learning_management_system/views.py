import json

from django.http import JsonResponse
# Create your views here.
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import courses, users


# Note: The decorator must be included because we don't
# have CSRF token in the header
@csrf_exempt
def main_page(request):
    return


@csrf_exempt
def log_in(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
        user = [username, password]
        if user is not None:
            return JsonResponse({'status': True, 'msg': 'Log in Success'})
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
    if request.method == "POST":
        return


def forget_pwd_reset(request):
    return


def course_main_page_stu(request):
    return HttpResponse()


def course_main_page_lec(request):
    return HttpResponse()


def dashboard_stu(request):
    return HttpResponse()


def dashboard_lec(request):
    return HttpResponse()
