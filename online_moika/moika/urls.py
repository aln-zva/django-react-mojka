from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = {
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('events/', views.EventsList.as_view()),
    path('events_all/', views.EventsAll.as_view()),
    path('events/<int:pk>/', views.EventsDetail.as_view()),
    path('types/', views.TypesList.as_view()),
    path('types/<int:pk>/', views.TypesDetail.as_view()),
    path('news/', views.NewsList.as_view()),
    path('news/<int:pk>/', views.NewsDetail.as_view()),
    path('media/', views.MediaList.as_view()),
}

urlpatterns = format_suffix_patterns(urlpatterns)