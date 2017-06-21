from rest_framework import serializers

from task.models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = [
            'created_at', 'order', 'is_done',
        ]
