from django.shortcuts import redirect, render
from django.shortcuts import render
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from Tquiper.forms import RegisterForm
from django.http import JsonResponse


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
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(username=username, password=password)

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
        print("dentro")

        form = RegisterForm(request.POST or None)

        if form.is_valid():
            user = form.save()
            print("salvo")
            return redirect("dashboard")
        else:
            print("nao valido")
    else:
        form = RegisterForm()
        print("nao eh valido")

    print("render")

    return render(request, "dashboard/register/site/base.html", {"form": form})


def pagination(request):
    return render(request, "dashboard/template/tables/base.html")


def registrar_empresa(request):
    pass
    # if request.method == "POST":
    #     form = EmpresaForm(request.POST)
    #     if form.is_valid():
    #         form.save()
    #         return JsonResponse(
    #             {"success": True, "message": "Empresa registrada com sucesso!"}
    #         )
    #     else:
    #         return JsonResponse(
    #             {
    #                 "success": False,
    #                 "message": "Erro ao registrar a empresa. Verifique o formulário.",
    #             }
    #         )
    # return JsonResponse({"success": False, "message": "Método de requisição inválido."})
