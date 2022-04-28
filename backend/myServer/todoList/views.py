from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response
from todoList import serializers

# Create your views here.

from todoList.models import Todo
from todoList.serializers import TodoListSerializers


@api_view(['GET', 'POST','DELETE'])
def todo_list(request):
  # get all data
  if request.method == 'GET':
    todoList = Todo.objects.values()
    serializer = TodoListSerializers(todoList, many=True)
    return JsonResponse(serializer.data, safe=False)
  # post new data
  elif request.method == 'POST':
    data = JSONParser().parse(request)
    check_to_have = Todo.objects.all().exists()
    if check_to_have:

      last_no = Todo.objects.latest("no").no
      data["no"] = last_no + 1
    else:
      data["no"] = 1
    serializer = TodoListSerializers(data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)
  elif request.method == 'DELETE':
    Todo.objects.all().delete()
    return JsonResponse({"message":"delete all is done"},status=204)

    


@api_view(['GET', 'PUT', 'DELETE'])
def todo_detail(request, id):
  try:
    todo = Todo.objects.get(id=id)
  except Todo.DoesNotExist:
    return JsonResponse(status=400)

  # get detail of data by primary key
  if request.method == 'GET':
    serializer = TodoListSerializers(todo)
    return JsonResponse(serializer.data, safe=False)
  # edit data by primary key
  elif request.method == 'PUT':
    data = JSONParser().parse(request)
    serializer = TodoListSerializers(todo, data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)
  elif request.method == 'DELETE':
    todo.delete()
    return JsonResponse({"message":"delete is done"},status=204)

@api_view(['PUT'])
def todo_swap(request):
  if request.method == 'PUT':
    data = JSONParser().parse(request)
    todo1 = Todo.objects.get(pk=data['firstId'])
    todo1.no = data["firstNo"]
    todo2 = Todo.objects.get(pk=data['seconId'])
    todo2.no = -1
    todo2.save()
    todo1.save()
    todo2.no = data["seconNo"]
    todo2.save()
    
    return JsonResponse({"message":"edit is done"},status=201)
