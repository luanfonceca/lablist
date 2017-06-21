from rest_framework import generics

from todolist.models import ToDoList
from todolist.serializers import ToDoListSerializer


class ToDoListApiView(generics.ListAPIView):
    queryset = ToDoList.objects.all()
    serializer_class = ToDoListSerializer
