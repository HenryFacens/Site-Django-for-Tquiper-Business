from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class RegisterForm(UserCreationForm):
	email 		= forms.EmailField()

	username 	= forms.CharField(max_length=30)

	password1 	= forms.CharField()

	password2 	= forms.CharField()

	empresa 	= forms.CharField(max_length=100, widget=forms.TextInput(attrs={'id':'empresa'}))


	class Meta:

		print("entrou na class Meta")

		model 	= 	User
		fields 	= 	("username", "email", "password1", "password2","empresa")

		# def __init__(self,*args,**kwargs):
		# 	super(RegisterForm, self).__init__(*args,**kwargs)

		# 	self.fields['empresa'].widget.attrs['id'] = 'empresa'