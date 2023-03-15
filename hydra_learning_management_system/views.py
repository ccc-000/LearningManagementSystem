from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt;

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
    return JsonResponse({"success" : "true"})

@csrf_exempt
def register(request):
    return JsonResponse({"success" : "true", "user_token" : "12345"})

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
