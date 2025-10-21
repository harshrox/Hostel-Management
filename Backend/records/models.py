from django.db import models
from django.conf import settings
from rooms.models import Room

class StudentRecord(models.Model):
    student = models.OneToOneField(settings.AUTH_USER_MODEL, limit_choices_to={'role': 'STUDENT'}, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, blank=True)
    admission_date = models.DateField()
    contact_number = models.CharField(max_length=15)
    emergency_contact = models.CharField(max_length=15, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.student.username} - {self.room}"
