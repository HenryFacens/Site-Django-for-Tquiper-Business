from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Company 


class RegisterForm(forms.ModelForm):

	# Empresa			= forms.CharField(max_length=30)
	# email			= forms.EmailField()
	# password1 		= forms.CharField(max_length=30)
	# password2 		= forms.CharField(max_length=30)
	# email 		= 	forms.EmailField()
	# username 	= 	forms.CharField(max_length	=	30)
	# company		= 	forms.CharField(max_length	=	100)
	class Meta:		
		model 	= 	Company
		fields 	= 	("Empresa", "email", "Imagem_do_Contrato", "Valor_do_Contrato","Valor_Gasto","Profile_Imagem",)