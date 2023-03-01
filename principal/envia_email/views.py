from django.shortcuts import render
from django.core.mail import send_mail
from django.http import HttpResponse
from django.conf import settings

def envia_email(request):
    if request.method == 'POST':
        msg = request.POST['message']
        email = request.POST['email']
        phone = request.POST['phone']
        name = request.POST['name']
        send_mail('Contact form',name,'conteudo',msg,'TELEFONE',phone,'settings.EMAIL_HOST_USER',[email])
    
    return render(request)
 