from companies.serializers import CompanySerializer
from .serializers import ComplaintAndCompanySerializer, ComplaintSerializer, CommentSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from api.models import User
from .models import Photo, Document, Comment, Complaint
from companies.models import Company
from rest_framework.pagination import PageNumberPagination

class ComplaintAndCompanyCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request, *args, **kwargs):
        company_name = request.data.get('company')
        company = None

        if company_name:
            # Check if the company already exists
            try:
                company = Company.objects.get(name=company_name)
            except Company.DoesNotExist:
                company_data = {
                    'name': company_name,
                    'phone': request.data.get('brandPhone'),
                    'email': request.data.get('brandEmail'),
                    'website': request.data.get('brandWebsite'),
                }
                company_serializer = CompanySerializer(data=company_data)
                if company_serializer.is_valid():
                    company = company_serializer.save()
                else:
                    return Response(company_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        author_name = request.data.get('author')
        if not author_name:
            return Response({'author': ['This field is required.']}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            author = User.objects.get(name=author_name)
        except User.DoesNotExist:
            return Response({'author': ['User not found.']}, status=status.HTTP_400_BAD_REQUEST)

        complaint_data = {
            'author': author.id,
            'title': request.data.get('title'),
            'description': request.data.get('description'),
            'private_description': request.data.get('privateDetails'),
            'company': company.id,
        }
        
        complaint_serializer = ComplaintSerializer(data=complaint_data)
        if complaint_serializer.is_valid():
            complaint = complaint_serializer.save()

            photos = request.FILES.getlist('photos')
            for photo in photos:
                Photo.objects.create(complaint=complaint, image=photo)

            documents = request.FILES.getlist('documents')
            for document in documents:
                Document.objects.create(complaint=complaint, file=document)

            return Response(complaint_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(complaint_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ComplaintDashboardView(RetrieveUpdateDestroyAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users can update or delete their own complaints
        return Complaint.objects.filter(author=self.request.user)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
class ComplaintDetailView(RetrieveAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [AllowAny]

class ListComplaintsView(ListAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [AllowAny]
    pagination_class = PageNumberPagination 
    
    def get_queryset(self):
        return Complaint.objects.all()

class CommentCreateView(CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CommentListView(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Comment.objects.filter(complaint=self.request.complaint)
        
    
# class CreateComplaintView(ListCreateAPIView): 
#     serializer_class = ComplaintSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = (MultiPartParser, FormParser)  # Needed for file uploads

#     def get_queryset(self):
#         return Complaint.objects.filter(author=self.request.user)
    
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)