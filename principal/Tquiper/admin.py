from django.contrib import admin
from .models import Company,Group
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin



@admin.register(Company)

class CompanyAdmin(admin.ModelAdmin):

	fieldsets = (
	('Dados Básicos', {
	'fields': ('Empresa', 'Grupo', 'email','Profile_Imagem')
	}),
	('Imagem do Contrato',
	{'fields': ('Imagem_do_Contrato',),}),

	('Valores',{
	'fields': ('Valor_do_Contrato', 'Valor_Gasto'),
	},))

# @admin.site(Company)

@admin.register(Group)

class GroupAdmin(admin.ModelAdmin):
		pass