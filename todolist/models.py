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
