from django.views import View
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from ..models.patientResult import PatientResult


class PatientResultBaseView(View):
    model = PatientResult
    fields = '__all__'
    success_url = reverse_lazy('films:all')


class FilmListView(PatientResultBaseView, ListView):
    """View to list all films.
    Use the 'film_list' variable in the template
    to access all Film objects"""


class FilmDetailView(PatientResultBaseView, DetailView):
    """View to list the details from one film.
    Use the 'film' variable in the template to access
    the specific film here and in the Views below"""


class FilmCreateView(PatientResultBaseView, CreateView):
    """View to create a new film"""


class FilmUpdateView(PatientResultBaseView, UpdateView):
    """View to update a film"""


class FilmDeleteView(PatientResultBaseView, DeleteView):
    """View to delete a film"""
