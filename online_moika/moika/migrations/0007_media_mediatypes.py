# Generated by Django 3.2.4 on 2021-06-08 23:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('moika', '0006_events_feedback'),
    ]

    operations = [
        migrations.CreateModel(
            name='MediaTypes',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('path', models.TextField()),
                ('event_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='event_id', to='moika.events')),
                ('media_type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='media_type', to='moika.mediatypes')),
            ],
        ),
    ]
