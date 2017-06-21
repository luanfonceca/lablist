from django.test import TestCase

from rest_framework import status
from rest_framework.reverse import reverse
from model_mommy import mommy

from todolist.models import ToDoList
from todolist.serializers import ToDoListSerializer


class ToDoListListViewTest(TestCase):
    def test_empty(self):
        response = self.client.get(reverse('todolist:list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [])

    def test_populated(self):
        todolist = mommy.make(ToDoList, title='Example list 1')
        response = self.client.get(reverse('todolist:list'))
        serializer = ToDoListSerializer(todolist)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [serializer.data])


class ToDoListDetailViewTest(TestCase):
    def setUp(self):
        self.todolist = mommy.make(ToDoList, title='Example list 1')

    def test_not_found(self):
        response = self.client.get(
            reverse('todolist:detail', kwargs={'pk': 99}))
        self.assertEqual(
            response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json(), {'detail': 'Not found.'})

    def test_example_list_1(self):
        todolist = mommy.make(ToDoList, title='Example list 1')
        response = self.client.get(
            reverse('todolist:detail', kwargs={'pk': todolist.pk}))

        serializer = ToDoListSerializer(todolist)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), serializer.data)
