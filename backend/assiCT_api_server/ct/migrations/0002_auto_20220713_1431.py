# Generated by Django 3.2.13 on 2022-07-13 05:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ct', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patientresult',
            name='studyDate',
        ),
        migrations.AddField(
            model_name='ctresult',
            name='studyDate',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]