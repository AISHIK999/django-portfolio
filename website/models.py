from django.db import models


class Experience(models.Model):
    company_name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)  # Making it optional
    description = models.TextField()

    def __str__(self):
        return f"{self.company_name} - {self.designation}"

    class Meta:
        ordering = ['-start_date']  # Most recent experience first


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    badge_link = models.URLField(null=True, blank=True)
    github_link = models.URLField(null=True, blank=True)
    image_link = models.URLField()

    def __str__(self):
        return self.title
