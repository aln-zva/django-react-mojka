from django.db import models
from django.contrib.auth.models import AbstractUser, User


class Roles(models.Model):
    is_student = models.BooleanField()
    is_external = models.BooleanField()


class Faculty(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=10)
    full_name = models.CharField(max_length=50)


class StudyGroup(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=10)
    faculty = models.ForeignKey(Faculty, on_delete=models.SET_NULL, null=True, related_name='faculty')


class CustomUsers(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.TextField()
    study_group = models.ForeignKey(StudyGroup, on_delete=models.SET_NULL, null=True, related_name='study_group')


class Types(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    # events = models.TextField()

    def __str__(self):
        return self.name


class Events(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    start_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    place = models.CharField(max_length=50)
    main_photo = models.TextField()
    description = models.TextField(null=True)
    annotation = models.CharField(max_length=250, null=True)
    feedback = models.TextField(default=' ')
    type_id = models.ForeignKey(Types, on_delete=models.SET_NULL, null=True, related_name='type')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['start_date']


class News(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    photo = models.TextField()
    description = models.TextField(null=True)
    event_id = models.ForeignKey(Events, on_delete=models.SET_NULL, null=True, related_name='event_id')

    def __str__(self):
        return self.name


class MediaTypes(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)


class Media(models.Model):
    id = models.AutoField(primary_key=True)
    path = models.TextField()
    event_id = models.ForeignKey(Events, on_delete=models.SET_NULL, null=True)
    media_type = models.ForeignKey(MediaTypes, on_delete=models.SET_NULL, null=True)


class Notifications(models.Model):
    id = models.AutoField(primary_key=True)
    info = models.TextField()
    name = models.CharField(max_length=100)
    event = models.ForeignKey(Events, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class SubEvent(models.Model):
    id = models.AutoField(primary_key=True)
    event = models.ForeignKey(Events, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=50)
    start_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    place = models.CharField(max_length=50)
    description = models.TextField(null=True)

    def __str__(self):
        return self.name


class OrganizationTeam (models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    full_name = models.TextField()





