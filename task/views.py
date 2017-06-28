from rest_framework import generics, exceptions

from task.models import Task
from task.serializers import TaskSerializer


class BaseTaskView():
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = super(BaseTaskView, self).get_queryset()
        user = self.request.user
        return queryset.filter(todolist__user=user)


class TaskListApiView(BaseTaskView,
                      generics.ListCreateAPIView):
    pass


class TaskApiView(BaseTaskView,
                  generics.RetrieveUpdateDestroyAPIView):
    pass


class TaskSortApiView(BaseTaskView, generics.UpdateAPIView):
    def partial_update(self, request, *args, **kwargs):
        self.object = self.get_object()
        order = self.request.data.get('order')
        if order is None:
            raise exceptions.NotFound()
        self.object.sort(order=order)
        return super(TaskSortApiView, self).partial_update(
            request, *args, **kwargs)


class TaskToggleApiView(BaseTaskView, generics.UpdateAPIView):
    def partial_update(self, request, *args, **kwargs):
        self.object = self.get_object()
        self.object.toggle()
        return super(TaskToggleApiView, self).partial_update(
            request, *args, **kwargs)
