from django.shortcuts import redirect, render
from django.shortcuts import render
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from Tquiper.forms import RegisterForm
from .models import Company
from django.views.decorators.http import require_GET, require_POST

def chat(request):
    return render(request, 'dashboard/messages/template/base.html')

def users(request):
    return render(request , 'dashboard/Users/template/base.html')

def startsite(request):
    return render(request, "page/site/tquiper.html")


def about(request):
    return render(request, "about/index/site/base.html")


def time(request):
    return render(request, "time/index/site/base.html")


def gallery(request):
    return render(request, "galeria/index/site/base.html")


def servico(request):
    return render(request, "servico/index/site/base.html")


@login_required
def dashboard(request):
    print("Entrou")
    return render(request, "dashboard/index/site/base.html")


@login_required
def saiu(request):
    logout(request)
    print("saiu")
    return redirect("login")

def my_account(request):

    if request.method == "POST":
        print("Entrou")
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(username=username, password=password)
        print(user)
        if user is not None:
            login(request, user)
            return redirect("dashboard")

        else:
            messages.error(request, "Credencias Erradas")
            return redirect("login")

    return render(request, "my_account/index/site/base.html")

@csrf_exempt
def contact(request):
    if request.method == "POST":
        msg = request.POST["message"]
        web = request.POST["website"]
        email = request.POST["email"]
        phone = request.POST["phone"]
        name = request.POST["name"]
        # send_mail(name + 'do email' + email + 'com telefone' + phone + 'Web Site' + web,msg,'yodao2018@gmail.com',['lolololplolololo49@gmail.com'],fail_silently=False)
        # send_mail(name,msg,'yodao2018@gmail.com',['lolololplolololo49@gmail.com'])
        send_mail(
            web,
            msg
            + "\n"
            + "\n"
            + "Telefone = "
            + phone
            + "\n"
            + "Nome = "
            + name
            + "\n"
            + "Email = "
            + email,
            "Requisição@gmail.com",
            ["lolololplolololo49@gmail.com"],
            fail_silently=False,
        )

        print(name)
        print(msg)
        print(email)
        print(phone)
        print(web)
        print(send_mail)

    return render(request, "contato/index/site/base.html")


def register(request):
    if request.method == "POST":

        Usuario    = request.post = ['Usuario']
        Empresa    = request.post = ['Empresa']
        Nome       = request.post = ['Nome']
        Sobrenome  = request.post = ['Sobrenome']
        email      = request.post = ['email']


        # form            = RegisterForm(request.POST or None) # Requisitando a Models

        if form.is_valid():
            modelscom   = Company(Usuario=Usuario,Empresa=Empresa,Nome=Nome,Sobrenome=Sobrenome,email=email)
            user        = modelscom.save()

            return redirect("dashboard")

        else:
            print("nao valido")
    else:
        form = RegisterForm()
    return render(request, "dashboard/register/site/base.html", {"form": form})
