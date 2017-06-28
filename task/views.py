from rest_framework import generics, exceptions

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


class TaskSortApiView(BaseTaskView, generics.UpdateAPIView):
    def partial_update(self, request, *args, **kwargs):
        self.object = self.get_object()
        order = self.request.data.get('order')
        if order is None:
            raise exceptions.NotFound()
        self.object.sort(order=order)
        return super(TaskSortApiView, self).partial_update(
            request, *args, **kwargs)


class TaskMarkAsDoneApiView(BaseTaskView, generics.UpdateAPIView):
    def partial_update(self, request, *args, **kwargs):
        self.object = self.get_object()
        self.object.mark_as_done()
        return super(TaskMarkAsDoneApiView, self).partial_update(
            request, *args, **kwargs)
