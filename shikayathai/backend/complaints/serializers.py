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
    class Meta:
        model = Comment
        fields = ['id', 'text', 'complaint', 'user', 'created_at']
        read_only_fields = ['id', 'created_at']
        
class ComplaintAndCompanySerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    documents = DocumentSerializer(many=True, read_only=True)
    company = CompanySerializer()

    class Meta:
        model = Complaint
        fields = ['id', 'author', 'title', 'description', 'private_description', 'photos', 'documents', 'company']

    def create(self, validated_data):
        company_data = validated_data.pop('company')
        company = Company.objects.create(**company_data)
        complaint = Complaint.objects.create(company=company, **validated_data)
        return complaint

class ComplaintSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    company_name = serializers.SerializerMethodField()
    
    photos = PhotoSerializer(many=True, read_only=True)
    documents = DocumentSerializer(many=True, read_only=True)
    class Meta:
        model = Complaint
        fields = ['id', 'author_name', 'title', 'description', 'private_description', 'company_name', 'photos', 'documents', 'resolution_rating', 'resolution_comment']
        
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
    def get_company_name(self, obj):
        return obj.company.name
        
        