from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class RegisterForm(UserCreationForm):
	pass
	# email 		= 	forms.EmailField()

	# username 	= 	forms.CharField(max_length	=	30)

	# password1 	= 	forms.CharField()

	# password2 	= 	forms.CharField()

	# company		= 	forms.CharField(max_length	=	100)


	# class Meta:		
	# 	model 	= 	User
	# 	fields 	= 	("username", "email", "password1", "password2",	"company")