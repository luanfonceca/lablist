from django.db import models
from django.conf import settings


class ToDoList(models.Model):
    title = models.CharField(
        verbose_name='Title', max_length=200)
    created_at = models.DateTimeField(
        verbose_name='Created At', auto_now_add=True)

    # relations
    user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        related_name='todolists')

    class Meta:
        verbose_name = 'ToDoList'
        verbose_name_plural = 'ToDoLists'

    def __str__(self):
        return self.title

    @property
    def progress_ratio(self):
        total = self.tasks.count()
        done_ones = self.tasks.filter(is_done=True).count()

        if not total or not done_ones:
            return None

        ratio = 100 * done_ones / total
        return '{:.1f}%'.format(ratio)
