from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from .models import Events, Types, News, Media, CustomUsers, Faculty, Notifications, OrganizationTeam, SubEvent

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ['id', 'name', 'full_name']


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'avatar', 'study_group']


class EventsSerializer (serializers.ModelSerializer):
    type_id = serializers.ReadOnlyField(source='type_id.name', read_only=True)

    class Meta:
        model = Events
        fields = ['id', 'name', 'start_date', 'end_date',
                  'place', 'main_photo', 'description', 'annotation', 'feedback', 'type_id']


class TypesSerializer (serializers.ModelSerializer):
    # events = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Types
        fields = ['id', 'name']


class NewsSerializer (serializers.ModelSerializer):
    # event_id = serializers.ReadOnlyField(source='event_id.name', read_only=True)

    class Meta:
        model = News
        fields = ['id', 'name', 'photo', 'description', 'event_id']


class MediaSerializer(serializers.ModelSerializer):
    event_id = serializers.ReadOnlyField(source='event_id.id', read_only=True)
    media_type = serializers.ReadOnlyField(source='media_type.id', read_only=True)

    class Meta:
        model = Media
        fields = ['id', 'path', 'event_id', 'media_type']


class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = ['id', 'name', 'event_id', 'info']


class OrganisationTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationTeam
        fields = ['id', 'name', 'full_name']


class SubEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubEvent
        fields = ['id', 'name', 'start_date', 'end_date',
                  'place', 'description', 'event']