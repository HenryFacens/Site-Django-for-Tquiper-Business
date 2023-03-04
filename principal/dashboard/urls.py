from django.urls import path, include
from dashboard import views

urlpatterns = [
 path('index',views.index, name="index"),

]
