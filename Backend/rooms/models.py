from django.db import models
from django.conf import settings
from django.utils import timezone

class Room(models.Model):
    ROOM_TYPE = (
        ('SINGLE', 'Single'),
        ('DOUBLE', 'Double'),
        ('TRIPLE', 'Triple'),
    )
    number = models.CharField(max_length=10, unique=True)
    room_type = models.CharField(max_length=10, choices=ROOM_TYPE)

    def __str__(self):
        return f"{self.number} ({self.room_type})"

    @property
    def capacity(self):
        """Derive capacity from room type"""
        mapping = {
            'SINGLE': 1,
            'DOUBLE': 2,
            'TRIPLE': 3,
        }
        return mapping.get(self.room_type, 1)

    @property
    def allocated_count(self):
        today = timezone.localdate()
        return self.allocation_set.filter(
            models.Q(end_date__isnull=True) | models.Q(end_date__gte=today)
        ).count()

    @property
    def is_allocated(self):
        return self.allocated_count >= self.capacity


class Allocation(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        limit_choices_to={'role': 'STUDENT'},
        on_delete=models.CASCADE
    )
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.student.username} -> {self.room.number}"
