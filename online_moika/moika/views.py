from django_filters.rest_framework import DjangoFilterBackend
from .service import EventFilter, PaginationEvents, PaginationMedia, PaginationNews

from rest_framework import generics, filters
from . import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from .models import Events, Types, News, Media

# User = get_user_model()


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class EventsList(generics.ListAPIView):
    serializer_class = serializers.EventsSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_class = EventFilter
    search_fields = ['name']
    pagination_class = PaginationEvents

    def get_queryset(self):
        events = Events.objects.all()
        return events


class EventsAll(generics.ListAPIView):
    serializer_class = serializers.EventsSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_class = EventFilter

    def get_queryset(self):
        events = Events.objects.all()
        return events


class EventsDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.EventsSerializer

    def get_queryset(self):
        event = Events.objects.all()
        return event


class TypesList(generics.ListAPIView):
    queryset = Types.objects.all()
    serializer_class = serializers.TypesSerializer


class TypesDetail(generics.RetrieveAPIView):
    queryset = Types.objects.all()
    serializer_class = serializers.TypesSerializer


class NewsList(generics.ListAPIView):
    serializer_class = serializers.NewsSerializer
    pagination_class = PaginationNews

    def get_queryset(self):
        news = News.objects.all()
        return news


class NewsDetail(generics.RetrieveAPIView):
    serializer_class = serializers.NewsSerializer

    def get_queryset(self):
        news_letter = News.objects.all()
        return news_letter


class MediaList(generics.ListAPIView):
    serializer_class = serializers.MediaSerializer
    pagination_class = PaginationMedia

    def get_queryset(self):
        media = Media.objects.all()
        event_id = self.request.query_params.get('event_id')
        if event_id is not None:
            media = media.filter(event_id__in=event_id)
        return media
