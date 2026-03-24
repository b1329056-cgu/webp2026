from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import serializers
from .models import Course_table

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course_table
        fields = ['department', 'course_title', 'instructor']

@api_view(['GET'])
def course_list(request):
    courses = Course_table.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

@api_view(['GET', 'POST'])
def add_course(request):
    dept = request.GET.get('dept')
    title = request.GET.get('title')
    teacher = request.GET.get('teacher')
    
    if dept and title and teacher:
        Course_table.objects.create(
            department=dept,
            course_title=title,
            instructor=teacher
            )
        
        return JsonResponse(
            {"message": "成功加入"},
            json_dumps_params={'ensure_ascii': False})
    return JsonResponse(
        {"message": "參數不足"},
        status=400,
        )
