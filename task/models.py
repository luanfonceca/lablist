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

    def save(self, *args, **kwargs):
        if not self.pk:
            self.order = self.todolist.tasks.count()
        super(Task, self).save(*args, **kwargs)

    def sort(self, order):
        tasks = self.todolist.tasks.exclude(pk=self.pk)
        if self.order > order:
            tasks.filter(
                order__gte=order,
                order__lte=self.order,
            ).update(order=models.F('order') + 1)
        elif self.order < order:
            tasks.filter(
                order__lte=order,
                order__gte=self.order,
            ).update(order=models.F('order') - 1)

        self.order = order
        self.save()

    def toggle(self):
        self.is_done = not self.is_done
        self.save()
