from django.shortcuts import render

from .models import Experience, Project


def index(request):
    experience_list = Experience.objects.all()
    project_list = Project.objects.all()
    context = {
        "experience_list": experience_list,
        "project_list": project_list,
    }
    return render(request, "website/index.html", context)
