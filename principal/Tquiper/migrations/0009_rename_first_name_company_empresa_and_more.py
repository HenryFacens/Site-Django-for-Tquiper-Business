# Generated by Django 4.1.6 on 2023-03-15 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tquiper', '0008_delete_empre_company_first_name_company_last_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='company',
            old_name='first_name',
            new_name='Empresa',
        ),
        migrations.RemoveField(
            model_name='company',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='company',
            name='perm',
        ),
        migrations.RemoveField(
            model_name='company',
            name='pro_imag',
        ),
        migrations.AddField(
            model_name='company',
            name='Contrato_Imagem',
            field=models.ImageField(null=True, upload_to='images/'),
        ),
        migrations.AddField(
            model_name='company',
            name='DateTimeField',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='company',
            name='Grupo',
            field=models.CharField(choices=[('admin', 'Administrador'), ('employee', 'Funcionario'), ('Company', 'Empresa')], max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='Profile_Imagem',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
        migrations.AddField(
            model_name='company',
            name='Quando_foi_gasto',
            field=models.DecimalField(decimal_places=2, max_digits=100, null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='Valor_do_Contrato',
            field=models.DecimalField(decimal_places=2, max_digits=100, null=True),
        ),
    ]