from django.urls import path
from todoList import views

urlpatterns = [
    path('getTodoList/', views.todo_list),
    path('postTodo', views.todo_list),
    path('deleteTodoList/', views.todo_list),
    path('getTodo/<int:pk>', views.todo_detail),
    path('putTodo/<int:pk>', views.todo_detail),
    path('deleteTodo/<int:id>', views.todo_detail),
    path('swapTodo', views.todo_swap),
]