
from django.contrib import admin
from django.urls import path, include
from Tquiper import urls
import Tquiper

urlpatterns = [
    path('admin/',admin.site.urls),
    path('',include('Tquiper.urls')),
]