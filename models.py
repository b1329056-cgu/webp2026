from django.db import models

class Course_table(models.Model):
    department = models.CharField(max_length=50)
    course_title = models.CharField(max_length=100)
    instructor = models.CharField(max_length=50)

    def __str__(self):
        return self.course_title
