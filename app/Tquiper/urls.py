from django.urls import path
from . import views


urlpatterns = [
    path("", views.startsite, name="Site"),
    path("contatos/", views.contact, name="contatos"),
    path("sobre_nos/", views.about, name="sobrenos"),
    path("time/", views.time, name="time"),
    path("galeria/", views.gallery, name="galeria"),
    path("servico/", views.servico, name="servico"),
    path("dashboard/login/", views.my_account, name="login"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("dashboard/report/", views.pagination, name="report"),
    path("logout/", views.saiu, name="logout"),
    path("dashboard/register/", views.register, name="register"),
    #
    path("registrar_empresa/", views.registrar_empresa, name="registrar_empresa"),
]
