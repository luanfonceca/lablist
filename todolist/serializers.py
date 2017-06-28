from rest_framework import serializers, fields

from todolist.models import ToDoList
from task.serializers import TaskSerializer


class ToDoListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    progress_ratio = fields.ReadOnlyField()

    class Meta:
        model = ToDoList
        fields = (
            'id', 'title', 'created_at',
            'tasks', 'progress_ratio',
        )
        read_only_fields = (
            'created_at',
        )
