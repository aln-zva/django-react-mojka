# Generated by Django 3.2.4 on 2021-06-08 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('moika', '0003_auto_20210608_1936'),
    ]

    operations = [
        migrations.AlterField(
            model_name='events',
            name='main_photo',
            field=models.TextField(),
        ),
    ]