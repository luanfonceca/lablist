import json

from django.test import TestCase
from rest_framework import status
from rest_framework.reverse import reverse
from model_mommy import mommy

from task.models import Task
from task.serializers import TaskSerializer
from todolist.models import ToDoList


class BaseTaskViewTest(TestCase):
    def setUp(self):
        self.todolist = mommy.make(ToDoList, title='Example list 1')


class TaskListViewTest(BaseTaskViewTest):
    def test_empty(self):
        response = self.client.get(reverse('task:list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [])

    def test_populated(self):
        task = mommy.make(
            Task, title='Example task 1',
            todolist=self.todolist)
        response = self.client.get(reverse('task:list'))
        serializer = TaskSerializer(task)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [serializer.data])


class TaskCreateViewTest(BaseTaskViewTest):
    def test_fail_on_title_required(self):
        data = {
            'todolist': self.todolist.pk
        }
        response = self.client.post(reverse('task:list'), data)

        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_fail_on_todolist_required(self):
        data = {
            'title': 'Example task 1',
        }
        response = self.client.post(reverse('task:list'), data)

        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create(self):
        data = {
            'title': 'Example task 1',
            'todolist': self.todolist.pk
        }
        response = self.client.post(reverse('task:list'), data)

        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED)
        serializer = TaskSerializer(Task.objects.first())
        self.assertEqual(response.json(), serializer.data)

    def test_create_duplicated_titles(self):
        mommy.make(
            Task, title='Example task 1',
            todolist=self.todolist)

        data = {
            'title': 'Example task 1',
            'todolist': self.todolist.pk
        }
        response = self.client.post(reverse('task:list'), data)

        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED)
        serializer = TaskSerializer(Task.objects.last())
        self.assertEqual(response.json(), serializer.data)


class TaskDetailViewTest(BaseTaskViewTest):
    def setUp(self):
        self.task = mommy.make(Task, title='Example task 1')

    def test_not_found(self):
        response = self.client.get(
            reverse('task:detail', kwargs={'pk': 99}))
        self.assertEqual(
            response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json(), {'detail': 'Not found.'})

    def test_example_list_1(self):
        task = mommy.make(Task, title='Example task 1')
        response = self.client.get(
            reverse('task:detail', kwargs={'pk': task.pk}))

        serializer = TaskSerializer(task)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), serializer.data)


class TaskUpdatViewTest(BaseTaskViewTest):
    def setUp(self):
        super(TaskUpdatViewTest, self).setUp()
        self.task = mommy.make(
            Task, title='Example task 1',
            todolist=self.todolist)

    def test_update(self):
        data = {
            'title': 'Example task 0',
        }
        response = self.client.patch(
            reverse('task:detail', kwargs={'pk': self.task.pk}),
            json.dumps(data), 'application/json')

        self.assertEqual(
            response.status_code, status.HTTP_200_OK)
        serializer = TaskSerializer(Task.objects.first())
        self.assertEqual(response.json(), serializer.data)


class ToDoLisDestroyViewTest(BaseTaskViewTest):
    def setUp(self):
        self.task = mommy.make(Task, title='Example task 1')

    def test_destroy(self):
        response = self.client.delete(
            reverse('task:detail', kwargs={'pk': self.task.pk}))

        self.assertEqual(
            response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, None)
