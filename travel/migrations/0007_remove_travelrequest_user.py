# Generated by Django 5.1.7 on 2025-03-12 12:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0006_alter_travelrequest_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='travelrequest',
            name='user',
        ),
    ]
