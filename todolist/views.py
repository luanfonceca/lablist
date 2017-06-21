from rest_framework import generics

from todolist.models import ToDoList
from todolist.serializers import ToDoListSerializer


class BaseToDoListView():
    queryset = ToDoList.objects.all()
    serializer_class = ToDoListSerializer


class ToDoListListApiView(BaseToDoListView, generics.ListAPIView):
    pass


class ToDoListApiView(BaseToDoListView,
                      generics.RetrieveUpdateDestroyAPIView):
    pass
