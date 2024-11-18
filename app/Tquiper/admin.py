from django.contrib import admin
from .models import Company
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin


class AccountInline(admin.StackedInline):
	model =	Company
	can_delete = False
	verbose_name_plural = 'Company'

class CustomizeUserAdmin(UserAdmin):
	inlines = (AccountInline,)

admin.site.unregister(User)
admin.site.register(User, CustomizeUserAdmin)

admin.site.register(Company)