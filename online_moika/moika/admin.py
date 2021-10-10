from django.contrib import admin

from django.contrib import admin
from .models import Events, Types, News, SubEvent, Notifications, Faculty, StudyGroup, CustomUsers

admin.site.register(Events)
admin.site.register(Types)
admin.site.register(News)
admin.site.register(SubEvent)
admin.site.register(Notifications)
admin.site.register(CustomUsers)
admin.site.register(Faculty)
admin.site.register(StudyGroup)





