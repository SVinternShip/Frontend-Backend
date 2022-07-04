# Generated by Django 3.2.13 on 2022-07-04 03:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ct', '0006_auto_20220703_2302'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='limeimage',
            name='ct_result',
        ),
        migrations.RemoveField(
            model_name='originalimage',
            name='ct_result',
        ),
        migrations.AddField(
            model_name='ctresult',
            name='lime_img',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='ct_result', to='ct.limeimage'),
        ),
        migrations.AddField(
            model_name='ctresult',
            name='original_img',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='ct_result', to='ct.originalimage'),
        ),
    ]
