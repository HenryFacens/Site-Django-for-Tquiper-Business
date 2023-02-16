from django.shortcuts import render


def startsite(request):
    return render(request,"page/site/tquiper.html")

def contact(request):
    return render(request,"contato/index/site/base.html")

