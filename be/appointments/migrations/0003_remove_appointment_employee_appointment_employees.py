# Generated by Django 5.1.3 on 2024-11-24 23:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0002_initial'),
        ('employees', '0002_alter_employee_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='employee',
        ),
        migrations.AddField(
            model_name='appointment',
            name='employees',
            field=models.ManyToManyField(related_name='appointments', to='employees.employee'),
        ),
    ]
