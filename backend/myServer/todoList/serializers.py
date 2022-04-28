from rest_framework import serializers
from todoList.models import Todo

class TodoListSerializers (serializers.ModelSerializer):

  

  class Meta:
    model = Todo
    fields = ['id', 'no', 'message', 'isDone']
