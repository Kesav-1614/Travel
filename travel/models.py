from django.db import models
from django.contrib.auth.models import User

class TravelRequest(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Declined', 'Declined'),
    ]
    TRAVEL_MODES = [
        ('Flight', 'Flight'),
        ('Train', 'Train'),
        ('Car', 'Car'),
    ]
    TICKET_BOOKING_MODES = [
        ('Self', 'Self'),
        ('Travel Desk', 'Travel Desk'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # ✅ Allow NULL temporarily
    username = models.CharField(max_length=150, blank=True, null=True)  # ✅ Allow NULL for username
    project = models.CharField(max_length=255)
    purpose = models.TextField()
    start_date = models.DateField()
    travel_mode = models.CharField(max_length=100)
    ticket_booking_mode = models.CharField(max_length=100)
    start_location = models.CharField(max_length=255)
    end_location = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    class Meta:
        db_table = 'travel_travelrequest'

    def __str__(self):
        return f'{self.project} - {self.purpose}'
