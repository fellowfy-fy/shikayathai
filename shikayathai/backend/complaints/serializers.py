from rest_framework import serializers
from .models import Photo, Document, Comment, Complaint

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
    userpic = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ['id', 'text', 'complaint', 'user_name', 'user', 'created_at', 'userpic']
        read_only_fields = ['id', 'created_at', 'user']
        
    
    def get_user_name(self, obj):
        return obj.user.name
    def get_userpic(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.user.userpic.url)

class ComplaintSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    company_name = serializers.SerializerMethodField()
    author_userpic = serializers.SerializerMethodField()
    
    photos = PhotoSerializer(many=True, read_only=True)
    documents = DocumentSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Complaint
        fields = ['id', 'author_name', 'author', 'author_userpic', 'title', 'description', 'private_description', 'company', 'company_name', 'photos', 'documents', 'resolution_rating', 'resolution_comment', 'comments', 'created_at']
        
    def create(self, validated_data):
        complaint = Complaint.objects.create(**validated_data)
        return complaint
    
    def get_author_name(self, obj):
        return obj.author.name
    def get_company_name(self, obj):
        return obj.company.name
    def get_author_userpic(self, obj):
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.author.userpic.url)
        return None
        
class ComplaintResolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = ['id', 'resolution_rating', 'resolution_comment']
        