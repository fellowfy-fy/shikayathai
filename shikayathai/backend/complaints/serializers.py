from rest_framework import serializers
from .models import Photo, Document, Comment, Complaint
from companies.models import Company
from companies.serializers import CompanySerializer

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'image']

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'file']

class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ['id', 'text', 'complaint', 'user_name', 'user', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']
        
    
    def get_user_name(self, obj):
        return obj.user.name

class ComplaintSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    company_name = serializers.SerializerMethodField()
    
    photos = PhotoSerializer(many=True, read_only=True)
    documents = DocumentSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Complaint
        fields = ['id', 'author_name', 'author', 'title', 'description', 'private_description', 'company', 'company_name', 'photos', 'documents', 'resolution_rating', 'resolution_comment', 'comments', 'created_at']
        
    def create(self, validated_data):
        complaint = Complaint.objects.create(**validated_data)
        return complaint
    
    def get_author_name(self, obj):
        return obj.author.name
    def get_company_name(self, obj):
        return obj.company.name
        
        