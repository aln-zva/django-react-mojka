from django_filters import rest_framework as filters
from rest_framework.response import Response

from .models import Events
from rest_framework.pagination import PageNumberPagination


class EventFilter(filters.FilterSet):
    start_date = filters.DateFilter(field_name='start_date', lookup_expr='gte')
    end_date = filters.DateFilter(field_name='end_date', lookup_expr='lte')
    search_fields = ['name']
    type_id = filters.Filter(field_name='type_id', lookup_expr='in')

    class Meta:
        model = Events
        fields = ['start_date', 'end_date', 'type_id']


class PaginationEvents(PageNumberPagination):
    page_size = 6
    max_page_size = 200

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'page_size': self.page_size,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })


class PaginationMedia(PageNumberPagination):
    page_size = 16
    max_page_size = 600

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'page_size': self.page_size,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })


class PaginationNews(PageNumberPagination):
    page_size = 4
    max_page_size = 100