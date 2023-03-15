from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from .models import Users_info
import json


# Create your views here.
from django.shortcuts import render, HttpResponse

# Note: The decorator must be included because we don't
# have CSRF token in the header
@csrf_exempt
def main_page(request):
    print(request.GET)
    return JsonResponse({"user_id": "z12345", "user_name": "zhangsan", "user_type": "student"})

@csrf_exempt
def login(request):
    if request.method == "POST":
        user_name = request.POST.get("user_name")
        pwd = request.POST.get("pwd")
        user = authenticate(request, user_name = user_name, pwd = pwd)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': True, 'msg': 'Log in Success'})
        else:
            return JsonResponse({'status': False, 'msg': 'Log in Fail'})


@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_name = data['user_name']
        pwd = data['pwd']
        e_mail = data['e_mail']
        role = data['role']
        print(user_name, pwd, e_mail, role)
        user = Users_info.objects.create(user_name = user_name, pwd= pwd, e_mail = e_mail, role = role)
        return JsonResponse({'status': True, 'msg': 'Register Success'})

@csrf_exempt
def forget_pwd_send_link(request):
    return render(request, "")


def forget_pwd_reset(request):
    return render(request, )


def course_main_page_stu(request):
    return HttpResponse()


def course_main_page_lec(request):
    return HttpResponse()


def dashboard_stu(request):
    return HttpResponse()


def dashboard_lec(request):
    return HttpResponse()
