# Generated by Django 5.1.7 on 2025-03-13 06:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0026_alter_travelrequest_ticket_booking_mode_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='travelrequest',
            name='ticket_booking_mode',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='travelrequest',
            name='travel_mode',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='travelrequest',
            name='username',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
