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


class TaskApiSortView(BaseTaskView, generics.UpdateAPIView):
    def get_old_task(self):
        old_task = self.request.data.get('old_task')
        try:
            return Task.objects.get(pk=old_task)
        except Task.DoesNotExist:
            raise exceptions.NotFound()

    def partial_update(self, request, *args, **kwargs):
        self.object = self.get_object()
        old_task = self.get_old_task()
        self.object.sort(old_task=old_task)
        return super(TaskApiSortView, self).partial_update(
            request, *args, **kwargs)
