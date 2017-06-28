from rest_framework import generics

from todolist.models import ToDoList
from todolist.serializers import ToDoListSerializer


class BaseToDoListView():
    queryset = ToDoList.objects.all()
    serializer_class = ToDoListSerializer

    def get_queryset(self):
        user = self.request.user
        return user.todolists.all()


class ToDoListListApiView(BaseToDoListView,
                          generics.ListCreateAPIView):
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ToDoListApiView(BaseToDoListView,
                      generics.RetrieveUpdateDestroyAPIView):
    pass
