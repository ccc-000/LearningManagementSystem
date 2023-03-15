from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from .models import users
import json


# Create your views here.
from django.shortcuts import render, HttpResponse

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
        user = authenticate(request, username = username, password = password)
        if user is None:
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
        user = users.objects.create(username = username, password= password, email = email, role = role)
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
