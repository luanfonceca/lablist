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

    def __str__(self):
        return self.title
