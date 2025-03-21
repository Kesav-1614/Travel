# Generated by Django 5.1.7 on 2025-03-12 17:32

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0010_travelrequest_status'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='travelrequest',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='travel_requests', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='travelrequest',
            name='end_location',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='travelrequest',
            name='project',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='travelrequest',
            name='purpose',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='travelrequest',
            name='start_location',
            field=models.CharField(max_length=255),
        ),
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
    ]
