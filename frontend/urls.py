from django.conf.urls import url

from frontend import views

urlpatterns = [
    url(regex=r'^$', view=views.BaseView.as_view(), name='base'),
]
