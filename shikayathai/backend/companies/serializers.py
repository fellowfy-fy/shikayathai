from rest_framework import serializers
from .models import Company
from complaints.serializers import ComplaintSerializer


class CompanySerializer(serializers.ModelSerializer):
    complaints = serializers.SerializerMethodField()
    
    class Meta:
        model = Company
        fields = ['id', 'name', 'website', 'phone', 'email', 'rating', 'complaints']
        
    def get_complaints(self, obj):
        complaints = obj.complaints.all()
        return ComplaintSerializer(complaints, many=True, context=self.context).data
        


    
    


