from django.urls import path, include
from Tquiper import views



urlpatterns = [
    path('',views.startsite, name="Site"),
    path('contatos/',views.contact, name="contatos"),
    path('sobre_nos/',views.about, name="sobrenos"),
    path('time/',views.time, name="time"),
    path('galeria/',views.gallery, name="galeria"),
    path('servico/',views.servico, name='servico'),
    path('login/',views.my_account, name='login'),
    path('dashboard/',views.dashboard, name="dashboard"),
]
