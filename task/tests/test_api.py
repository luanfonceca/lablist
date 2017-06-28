import json

from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from model_mommy import mommy

from task.models import Task
from task.serializers import TaskSerializer
from todolist.models import ToDoList


class BaseTaskViewTest(APITestCase):
    def setUp(self):
        self.user = mommy.make(
            User, username='admin', password='admin',
            email='admin@admin.com')
        self.client.login(username='admin', password='admin')
        self.client.force_authenticate(user=self.user)
        self.todolist = mommy.make(
            ToDoList, title='Example list 1', user=self.user)


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
        serializer = TaskSerializer(Task.objects.get(pk=1))
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
        serializer = TaskSerializer(Task.objects.get(pk=2))
        self.assertEqual(response.json(), serializer.data)


class TaskDetailViewTest(BaseTaskViewTest):
    def setUp(self):
        super(TaskDetailViewTest, self).setUp()
        self.task = mommy.make(
            Task, title='Example task 1', todolist=self.todolist)

    def test_not_found(self):
        response = self.client.get(
            reverse('task:detail', kwargs={'pk': 99}))
        self.assertEqual(
            response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json(), {'detail': 'Not found.'})

    def test_example_list_1(self):
        task = mommy.make(
            Task, title='Example task 1', todolist=self.todolist)
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
            data)

        self.assertEqual(
            response.status_code, status.HTTP_200_OK)
        serializer = TaskSerializer(Task.objects.get(pk=1))
        self.assertEqual(response.json(), serializer.data)


class TaskDestroyViewTest(BaseTaskViewTest):
    def setUp(self):
        super(TaskDestroyViewTest, self).setUp()
        self.task = mommy.make(
            Task, title='Example task 1', todolist=self.todolist)

    def test_destroy(self):
        response = self.client.delete(
            reverse('task:detail', kwargs={'pk': self.task.pk}))

        self.assertEqual(
            response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, None)


class TaskSortViewTest(BaseTaskViewTest):
    def setUp(self):
        super(TaskSortViewTest, self).setUp()
        self.task1 = mommy.make(
            Task, title='Example task 1', order=0,
            todolist=self.todolist)
        self.task2 = mommy.make(
            Task, title='Example task 2', order=1,
            todolist=self.todolist)
        self.task3 = mommy.make(
            Task, title='Example task 3', order=2,
            todolist=self.todolist)
        self.task4 = mommy.make(
            Task, title='Example task 4', order=3,
            todolist=self.todolist)

    def test_empty_params_to_sort_view(self):
        data = {}
        response = self.client.patch(
            reverse('task:sort', kwargs={'pk': self.task2.pk}),
            data)

        self.assertEqual(
            response.status_code, status.HTTP_404_NOT_FOUND)

    def test_sort(self):
        data = {
            'order': 0
        }
        response = self.client.patch(
            reverse('task:sort', kwargs={'pk': self.task4.pk}),
            data)

        self.assertEqual(
            response.status_code, status.HTTP_200_OK)

        excpect_data = [
            TaskSerializer(task).data
            for task in Task.objects.all()
        ]
        response = self.client.get(reverse('task:list'))
        self.assertEqual(response.json(), excpect_data)


class TaskMarkAsDoneViewTest(BaseTaskViewTest):
    def setUp(self):
        super(TaskMarkAsDoneViewTest, self).setUp()
        self.task = mommy.make(
            Task, title='Example task 1', todolist=self.todolist)

    def test_destroy(self):
        response = self.client.patch(
            reverse('task:toggle', kwargs={'pk': self.task.pk}),
            {})

        self.assertEqual(
            response.status_code, status.HTTP_200_OK)
        serializer = TaskSerializer(Task.objects.get(pk=1))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), serializer.data)
