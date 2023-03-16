from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.apps import AppConfig

prem_CHOICES = [
		('admin','Administrador'),
		('employee','Funcionario'),
		('Company','Empresa')
	]

class Group(models.Model):
	pass

class Company(models.Model):
	Empresa 							= models.CharField(max_length=100, default="")
	Grupo								= models.CharField(max_length=100,choices=prem_CHOICES,default="Company")
	DateTimeField						= models.DateTimeField(auto_now_add=True)
	email								= models.EmailField(null=True)
	Imagem_do_Contrato					= models.ImageField(upload_to='images/',blank=False,null=True)
	Valor_do_Contrato					= models.DecimalField(max_digits=100,decimal_places=2,null=True)
	Valor_Gasto							= models.DecimalField(max_digits=100,decimal_places=2,null=True)
	Profile_Imagem						= models.ImageField(upload_to='images/',blank=True,null=True)

	class Meta:
		verbose_name 					= "Dados Empresariais"
		verbose_name_plural 			= "Dados Empresariais"

