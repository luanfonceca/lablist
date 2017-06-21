from django.conf.urls import url

from todolist import views

urlpatterns = [
    url(regex=r'^$', view=views.ToDoListApiView.as_view(),
        name='list'),
]
