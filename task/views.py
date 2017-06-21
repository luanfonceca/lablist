from rest_framework import generics

from task.models import Task
from task.serializers import TaskSerializer


class BaseTaskView():
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskListApiView(BaseTaskView,
                      generics.ListCreateAPIView):
    pass


class TaskApiView(BaseTaskView,
                  generics.RetrieveUpdateDestroyAPIView):
    pass
