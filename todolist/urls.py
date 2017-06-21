from django.conf.urls import url

from todolist import views

urlpatterns = [
    url(regex=r'^$', view=views.ToDoListListApiView.as_view(),
        name='list'),
    url(regex=r'^(?P<pk>[\d+]+)/$',
        view=views.ToDoListApiView.as_view(),
        name='detail'),
]
