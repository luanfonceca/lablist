from rest_framework import serializers

from todolist.models import ToDoList
from task.serializers import TaskSerializer


class ToDoListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = ToDoList
        fields = (
            'id', 'title', 'created_at',
            'tasks'
        )
