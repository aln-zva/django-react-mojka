# Generated by Django 3.2.4 on 2021-06-08 15:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('moika', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='events',
            name='annotation',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='events',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='events',
            name='type_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='type', to='moika.types'),
        ),
    ]
