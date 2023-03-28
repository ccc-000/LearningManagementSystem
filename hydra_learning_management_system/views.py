from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
from django.shortcuts import render, HttpResponse
from django.shortcuts import render, redirect
from .form import UserForm


def main_page(request):
    # return render(request, "main_page.html")
    return JsonResponse({"message": "Hello, world!"})


def login(request):
    return render(request, "log_in.html")


def register(request):
    if register.method == "POST":
        form = UserForm(request.POST)
        if(form.is_valid()):
            form.save()
            return ("Account has been created successfully.")
        else:
            form = UserForm()
        return render(request,)




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
