from django.conf.urls import url

from task import views

urlpatterns = [
    url(regex=r'^$', view=views.TaskListApiView.as_view(),
        name='list'),
    url(regex=r'^(?P<pk>[\d+]+)/$',
        view=views.TaskApiView.as_view(),
        name='detail'),
    url(regex=r'^(?P<pk>[\d+]+)/sort/$',
        view=views.TaskSortApiView.as_view(),
        name='sort'),
    url(regex=r'^(?P<pk>[\d+]+)/toggle/$',
        view=views.TaskToggleApiView.as_view(),
        name='toggle'),
]
