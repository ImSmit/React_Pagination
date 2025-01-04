from rest_framework.pagination import LimitOffsetPagination


def paginator(queryset, request, serializer):
    paginator = LimitOffsetPagination()
    paginator.page_size = 5
    paginated_queryset = paginator.paginate_queryset(queryset, request)
    serializer = serializer(paginated_queryset, many=True)
    return paginator.get_paginated_response(serializer.data)
