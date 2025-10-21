from django.db import models
from django.conf import settings

class Room(models.Model):
    ROOM_TYPE = (
        ('SINGLE', 'Single'),
        ('DOUBLE', 'Double'),
        ('TRIPLE', 'Triple'),
    )
    number = models.CharField(max_length=10, unique=True)
    room_type = models.CharField(max_length=10, choices=ROOM_TYPE)
    capacity = models.IntegerField()

    def __str__(self):
        return f"{self.number} ({self.room_type})"

class Allocation(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, limit_choices_to={'role': 'STUDENT'}, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.student.username} -> {self.room.number}"
