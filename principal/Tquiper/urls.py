from django.urls import path, include
from Tquiper import views



urlpatterns = [
    path('',views.startsite, name="Site"),
    path('contatos/',views.contact, name="contatos"),
]
