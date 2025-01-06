from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import BankAccount
from django.db.models.signals import post_save

@receiver(post_save, sender=User)
def create_bank_account(sender, instance, created, **kwargs):
    if created:
        BankAccount.objects.create(user=instance, bank_name="cash", money=0)