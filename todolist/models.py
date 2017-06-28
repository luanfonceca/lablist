from django.db import models


class ToDoList(models.Model):
    title = models.CharField(
        verbose_name='Title', max_length=200)
    created_at = models.DateTimeField(
        verbose_name='Created At', auto_now_add=True)

    class Meta:
        verbose_name = 'ToDoList'
        verbose_name_plural = 'ToDoLists'

    def __str__(self):
        return self.title

    @property
    def progress_ratio(self):
        if not self.tasks.exists():
            return None

        total = self.tasks.count()
        done_ones = self.tasks.filter(is_done=True).count()
        ratio = 100 * done_ones / total
        return '{:.1f}%'.format(ratio)
