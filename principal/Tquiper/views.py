from django.shortcuts import render


def startsite(request):
    return render(request,"page/site/tquiper.html")
