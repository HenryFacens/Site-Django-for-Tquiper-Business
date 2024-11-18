from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Company(models.Model):  # Login
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    company = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username


class Empresa(models.Model):
    nome = models.CharField(max_length=255, verbose_name="Nome da Empresa")
    site = models.URLField(blank=True, null=True, verbose_name="Site da Empresa")
    comentario = models.TextField(blank=True, null=True, verbose_name="Comentário")
    data_criacao = models.DateTimeField(
        auto_now_add=True, verbose_name="Data de Criação"
    )
    ultima_atualizacao = models.DateTimeField(
        auto_now=True, verbose_name="Última Atualização"
    )

    def __str__(self):
        return self.nome


class LaborDirect(models.Model):
    empresa = models.ForeignKey(
        Empresa, on_delete=models.CASCADE, related_name="labor_direct_entries"
    )
    categoria_profissional = models.CharField(
        max_length=50, verbose_name="Categoria Profissional"
    )
    valor_mensal = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="R$ Mês"
    )
    quantidade = models.PositiveIntegerField(verbose_name="Quantidade")
    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="SubTotal Por",
        blank=True,
        null=True,
    )
    data_criacao = models.DateTimeField(
        default=timezone.now, verbose_name="Data de Criação"
    )
    data_atualizacao = models.DateTimeField(
        auto_now=True, verbose_name="Data de Atualização"
    )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Armazena o histórico sempre que uma alteração é salva
        LaborDirectHistorico.objects.create(
            labor_direct=self,
            valor_mensal=self.valor_mensal,
            quantidade=self.quantidade,
            subtotal=self.subtotal,
            data_registro=timezone.now(),
        )


class LaborDirectHistorico(models.Model):
    labor_direct = models.ForeignKey(
        LaborDirect, on_delete=models.CASCADE, related_name="historico"
    )
    valor_mensal = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade = models.PositiveIntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    data_registro = models.DateTimeField(verbose_name="Data de Registro")

    def __str__(self):
        return f"{self.labor_direct.categoria_profissional} - {self.data_registro}"


class LaborIndirect(models.Model):
    empresa = models.ForeignKey(
        Empresa, on_delete=models.CASCADE, related_name="labor_indirect_entries"
    )
    categoria_profissional = models.CharField(
        max_length=50, verbose_name="Categoria Profissional"
    )
    valor_mensal = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="R$ Mês"
    )
    quantidade = models.PositiveIntegerField(verbose_name="Quantidade")
    subtotal = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="SubTotal Por"
    )
    data_criacao = models.DateTimeField(
        default=timezone.now, verbose_name="Data de Criação"
    )
    data_atualizacao = models.DateTimeField(
        auto_now=True, verbose_name="Data de Atualização"
    )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Armazena o histórico sempre que uma alteração é salva
        LaborIndirectHistorico.objects.create(
            labor_indirect=self,
            valor_mensal=self.valor_mensal,
            quantidade=self.quantidade,
            subtotal=self.subtotal,
            data_registro=timezone.now(),
        )


class LaborIndirectHistorico(models.Model):
    labor_indirect = models.ForeignKey(
        LaborIndirect, on_delete=models.CASCADE, related_name="historico"
    )
    valor_mensal = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade = models.PositiveIntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    data_registro = models.DateTimeField(verbose_name="Data de Registro")

    def __str__(self):
        return f"{self.labor_indirect.categoria_profissional} - {self.data_registro}"


class OutrosBeneficios(models.Model):
    empresa = models.ForeignKey(
        Empresa, on_delete=models.CASCADE, related_name="outros_beneficios_entries"
    )
    categoria_profissional = models.CharField(
        max_length=50, verbose_name="Categoria Profissional"
    )
    salario = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Salário"
    )
    quantidade = models.PositiveIntegerField(verbose_name="Quantidade")
    plr = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="PRL (%)")
    pts = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="PTS (%)")
    subtotal = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="SubTotal (R$ Mês)"
    )
    data_criacao = models.DateTimeField(
        default=timezone.now, verbose_name="Data de Criação"
    )
    data_atualizacao = models.DateTimeField(
        auto_now=True, verbose_name="Data de Atualização"
    )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Cria uma entrada de histórico ao salvar
        OutrosBeneficiosHistorico.objects.create(
            outros_beneficios=self,
            salario=self.salario,
            quantidade=self.quantidade,
            plr=self.plr,
            pts=self.pts,
            subtotal=self.subtotal,
            data_registro=timezone.now(),
        )


class OutrosBeneficiosHistorico(models.Model):
    outros_beneficios = models.ForeignKey(
        OutrosBeneficios, on_delete=models.CASCADE, related_name="historico"
    )
    salario = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade = models.PositiveIntegerField()
    plr = models.DecimalField(max_digits=5, decimal_places=2)
    pts = models.DecimalField(max_digits=5, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    data_registro = models.DateTimeField(verbose_name="Data de Registro")

    def __str__(self):
        return f"{self.outros_beneficios.categoria_profissional} - {self.data_registro}"
