import datetime

from django.test import TestCase

from rest_framework import status
from model_mommy import mommy

from todolist.models import ToDoList
from todolist.views import ToDoListApiView
from todolist.serializers import ToDoListSerializer


class ToDoListApiViewTest(TestCase):
    def test_empty_list_view(self):
        response = self.client.get('/api/lists/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [])

    def test_list_view(self):
        todolist = mommy.make(ToDoList, title='Example list 1')
        response = self.client.get('/api/lists/')
        serializer = ToDoListSerializer(todolist)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [serializer.data])