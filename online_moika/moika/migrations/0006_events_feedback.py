# Generated by Django 3.2.4 on 2021-06-08 22:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('moika', '0005_news'),
    ]

    operations = [
        migrations.AddField(
            model_name='events',
            name='feedback',
            field=models.TextField(default=' '),
        ),
    ]