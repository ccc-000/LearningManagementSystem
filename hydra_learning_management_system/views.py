from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, HttpResponse


def main_page(request):
    return render(request, "main_page.html")


def log_in(request):
    return render(request, "log_in.html")


def register_up(request):
    return render(request, "register_up.html")

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
