from django.db import models


class Task(models.Model):
    title = models.CharField(
        verbose_name='Title', max_length=200)
    created_at = models.DateTimeField(
        verbose_name='Created At', auto_now_add=True)
    deadline = models.DateTimeField(
        verbose_name='Deadline', null=True, blank=True)
    order = models.SmallIntegerField(
        verbose_name='Order', default=0)
    is_done = models.BooleanField(
        verbose_name='Is done', default=False)

    # relations
    todolist = models.ForeignKey(
        to='todolist.ToDoList', related_name='tasks')

    class Meta:
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'
        ordering = ['order']

    def __str__(self):
        return self.title

    def sort(self, old_task):
        tasks = self.todolist.tasks.exclude(pk=self.pk)
        if self.order > old_task.order:
            tasks.filter(
                order__gte=old_task.order
            ).update(order=models.F('order') + 1)
        elif self.order < old_task.order:
            tasks.filter(
                order__lte=old_task.order
            ).update(order=models.F('order') - 1)

        self.order = old_task.order
        self.save()

    def mark_as_done(self):
        self.is_done = True
        self.save()
