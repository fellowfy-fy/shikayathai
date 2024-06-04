from rest_framework import serializers
from .models import User, Company, Complaint, Comment, Photo, Document
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'userpic', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
    
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'website']


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'file', 'complaint']

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'file', 'complaint']

class ComplaintSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    photos = serializers.ListField(
        child=serializers.ImageField(max_length=100000, allow_empty_file=False, use_url=False),
        write_only=True
    )
    documents = serializers.ListField(
        child=serializers.FileField(max_length=100000, allow_empty_file=False, use_url=False),
        write_only=True
    )
    class Meta:
        model = Complaint
        fields = ['id', 'author_name', 'title', 'description', 'private_description', 'company', 'photos', 'documents', 'resolution_rating', 'resolution_comment']
        
    def create(self, validated_data):
        photos_data = validated_data.pop('photos')
        documents_data = validated_data.pop('documents')
        complaint = Complaint.objects.create(**validated_data)
        for photo_data in photos_data:
            Photo.objects.create(complaint=complaint, image=photo_data)
        for document_data in documents_data:
            Document.objects.create(complaint=complaint, file=document_data)
        return complaint
    
    def get_author_name(self, obj):
        return obj.author.name

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'text', 'complaint', 'user', 'created_at']

        