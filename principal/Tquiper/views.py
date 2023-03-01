from django.shortcuts import render
from django.shortcuts import render
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.conf import settings


def startsite(request):
    return render(request,"page/site/tquiper.html")

# def contact(request):
#     return render(request,"contato/index/site/base.html")

def about(request):
    return render(request,"about/index/site/base.html")

def time(request):
    return render(request,"time/index/site/base.html")

def gallery(request):
    return render(request,"galeria/index/site/base.html")

def servico(request):
    return render(request,"servico/index/site/base.html")

def my_account(request):
    return render(request,"my_account/index/site/base.html")

@csrf_exempt
def contact(request):
    if request.method == 'POST':
        msg = request.POST['message']
        web = request.POST['website']
        email = request.POST['email']
        phone = request.POST['phone']
        name = request.POST['name']
        # send_mail(name + 'do email' + email + 'com telefone' + phone + 'Web Site' + web,msg,'yodao2018@gmail.com',['lolololplolololo49@gmail.com'],fail_silently=False)
        # send_mail(name,msg,'yodao2018@gmail.com',['lolololplolololo49@gmail.com'])
        send_mail(web,msg + '\n' + '\n' + 'Telefone = ' + phone + '\n' +'Nome = '  + name + '\n' +'Email = ' + email,'Requisição@gmail.com',['lolololplolololo49@gmail.com'],fail_silently=False)


        print(name)
        print(msg)
        print(email)
        print(phone)
        print(web)
        print(send_mail)
    
    return render(request,"contato/index/site/base.html")
 