from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
from django.shortcuts import render, HttpResponse
from django.shortcuts import render, redirect
from .form import UserForm


def main_page(request):
<<<<<<< HEAD
    # return render(request, "main_page.html")
    return JsonResponse({"message": "Hello, world!"})


def login(request):
    return render(request, "log_in.html")
=======
    return

@csrf_exempt
def log_in(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
        user = users.authenticate(request, username = username, password = password)
        if user is None:
            return JsonResponse({'status': True, 'msg': 'Log in Success'})
        else:
            return JsonResponse({'status': False, 'msg': 'Log in Fail'})
>>>>>>> 916934f49eb0e0b01945c2641190bb942f7d2312


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
