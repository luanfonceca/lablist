import json

from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from model_mommy import mommy

from todolist.models import ToDoList
from todolist.serializers import ToDoListSerializer


class BaseToDoListViewTest(APITestCase):
    def setUp(self):
        self.user = mommy.make(
            User, username='admin', password='admin',
            email='admin@admin.com')
        self.client.login(username='admin', password='admin')
        self.client.force_authenticate(user=self.user)


class ToDoListListViewTest(BaseToDoListViewTest):
    def test_empty(self):
        response = self.client.get(reverse('todolist:list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [])

    def test_populated(self):
        todolist = mommy.make(
            ToDoList, title='Example list 1', user=self.user)
        response = self.client.get(reverse('todolist:list'))
        serializer = ToDoListSerializer(todolist)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [serializer.data])


class ToDoListCreateViewTest(BaseToDoListViewTest):
    def test_fail_on_title_required(self):
        response = self.client.post(reverse('todolist:list'))

        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create(self):
        response = self.client.post(
            reverse('todolist:list'),
            {'title': 'Example list 1'})

        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED)
        serializer = ToDoListSerializer(ToDoList.objects.first())
        self.assertEqual(response.json(), serializer.data)

    def test_create_duplicated_titles(self):
        mommy.make(ToDoList, title='Example list 1')

        response = self.client.post(
            reverse('todolist:list'),
            {'title': 'Example list 1'})

        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED)
        serializer = ToDoListSerializer(ToDoList.objects.last())
        self.assertEqual(response.json(), serializer.data)


class ToDoListDetailViewTest(BaseToDoListViewTest):
    def setUp(self):
        super(ToDoListDetailViewTest, self).setUp()
        self.todolist = mommy.make(
            ToDoList, title='Example list 1', user=self.user)

    def test_not_found(self):
        response = self.client.get(
            reverse('todolist:detail', kwargs={'pk': 99}))
        self.assertEqual(
            response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json(), {'detail': 'Not found.'})

    def test_example_list_1(self):
        todolist = mommy.make(
            ToDoList, title='Example list 1', user=self.user)
        response = self.client.get(
            reverse('todolist:detail', kwargs={'pk': todolist.pk}))

        serializer = ToDoListSerializer(todolist)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), serializer.data)


class ToDoListUpdatViewTest(BaseToDoListViewTest):
    def setUp(self):
        super(ToDoListUpdatViewTest, self).setUp()
        self.todolist = mommy.make(
            ToDoList, title='Example list 1', user=self.user)

    def test_update(self):
        response = self.client.put(
            reverse('todolist:detail', kwargs={'pk': self.todolist.pk}),
            {'title': 'Example list 0'})

        self.assertEqual(
            response.status_code, status.HTTP_200_OK)
        serializer = ToDoListSerializer(ToDoList.objects.first())
        self.assertEqual(response.json(), serializer.data)

    def test_fail_on_title_required(self):
        response = self.client.put(
            reverse('todolist:detail', kwargs={'pk': self.todolist.pk}),
            {})

        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST)


class ToDoLisDestroyViewTest(BaseToDoListViewTest):
    def setUp(self):
        super(ToDoLisDestroyViewTest, self).setUp()
        self.todolist = mommy.make(
            ToDoList, title='Example list 1', user=self.user)

    def test_destroy(self):
        response = self.client.delete(
            reverse('todolist:detail', kwargs={'pk': self.todolist.pk}))

        self.assertEqual(
            response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, None)
