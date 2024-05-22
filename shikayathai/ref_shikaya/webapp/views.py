from django.shortcuts import render, redirect, get_object_or_404
from .forms import SignUpForm
from django.contrib.auth import login, authenticate
from .forms import ComplaintForm
from .models import Company, Complaint
from django.http import JsonResponse
from django.core.paginator import Paginator

def signup(request):
    if request.user.is_authenticated:
        return redirect('profile') 

    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('thank_you')
    else:
        form = SignUpForm()
    from allauth.socialaccount.models import SocialApp
    apps = SocialApp.objects.all()
    return render(request, 'signup.html', {'form': form,'social_apps': apps})


def thank_you(request):
    return render(request, 'thank_you.html')

def test(request):
    return render(request, 'test.html')    

def profile(request):
    return render(request, 'profile.html')


def add_complaint(request):
    if not request.user.is_authenticated:
        return redirect('login')  # Перенаправление на страницу входа, если пользователь не авторизован

    if request.method == 'POST':
        form = ComplaintForm(request.POST, request.FILES)
        if form.is_valid():
            # Получаем или создаем компанию
            company_name = form.cleaned_data['company_name']
            company, created = Company.objects.get_or_create(name=company_name)

            # Создаем жалобу
            complaint = form.save(commit=False)
            complaint.company = company
            complaint.user = request.user  # Устанавливаем текущего пользователя как автора жалобы
            complaint.save()
            return redirect('home')  # Перенаправление после создания жалобы
    else:
        form = ComplaintForm()
    return render(request, 'add_complaint.html', {'form': form})


def company_list(request):
    if 'term' in request.GET:
        qs = Company.objects.filter(name__icontains=request.GET.get('term'))
        companies = list(qs.values_list('name', flat=True))
        return JsonResponse(companies, safe=False)
    return JsonResponse([])

def complaint_detail(request, company_slug, complaint_slug):
    company = get_object_or_404(Company, slug=company_slug)
    complaint = get_object_or_404(Complaint, slug=complaint_slug, company=company)
    return render(request, 'complaint_detail.html', {'complaint': complaint})

def company_detail(request, slug):
    company = get_object_or_404(Company, slug=slug)
    complaints_list = Complaint.objects.filter(company=company).order_by('-created_at')  
    paginator = Paginator(complaints_list, 20) 

    page_number = request.GET.get('page')
    complaints = paginator.get_page(page_number)

    return render(request, 'company_detail.html', {'company': company, 'complaints': complaints})

def company_list(request):
    companies = Company.objects.all()
    return render(request, 'company_list.html', {'companies': companies})

def complaint_list(request):
    complaints_list = Complaint.objects.all().order_by('-created_at') 
    paginator = Paginator(complaints_list, 20)

    page_number = request.GET.get('page')
    complaints = paginator.get_page(page_number)

    return render(request, 'complaint_list.html', {'complaints': complaints})