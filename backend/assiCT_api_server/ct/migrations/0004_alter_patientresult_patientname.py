# Generated by Django 3.2.13 on 2022-07-21 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ct', '0003_ctresult_filename'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patientresult',
            name='patientName',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
