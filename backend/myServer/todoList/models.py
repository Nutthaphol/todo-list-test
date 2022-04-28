from django.db import models

# Create your models here.

class Todo (models.Model):
  no = models.IntegerField(unique=True)
  message = models.TextField()
  isDone = models.BooleanField(default=False)

  class Meta:
    ordering=['no']
