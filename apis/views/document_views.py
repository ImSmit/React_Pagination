from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from apis.serializers import RegisterDocumentSerializer, DocumentSerializer, GetDocumentSerializer
from apis.models import Document
from doc_management_back_end.helpers import paginator
from django.db.models import Q

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def uploadDocument(request):
    user = request.user
    data = request.data
    data['user'] = user.id
    serializer = RegisterDocumentSerializer(data=data)
    if serializer.is_valid():
        document = Document.objects.create(
            user=user,
            document=serializer.validated_data['document'],
            name=serializer.validated_data['name']
        )

        document_serializer = DocumentSerializer(document, many=False)
        return Response({"success": "Document uploaded successfully", "data": document_serializer.data}, status=status.HTTP_201_CREATED)
    return Response({"error": "Failed to upload document", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateDocument(request, document_id):
    data = request.data
    document = Document.objects.get(id=document_id)
    serializer = RegisterDocumentSerializer(document, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": "Document updated successfully", "data": serializer.data}, status=status.HTTP_200_OK)
    return Response({"error": "Failed to update document", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getDocuments(request):
    documents = Document.objects.filter(user=request.user)
    paginated_documents = paginator(documents, request, GetDocumentSerializer)
    return Response(paginated_documents.data, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def searchDocuments(request):
    search_item = request.query_params.get('search')
    documents = Document.objects.filter(Q(name__icontains=search_item) | Q(document__icontains=search_item), user=request.user)
    paginated_documents = paginator(documents, request, GetDocumentSerializer)
    return Response(paginated_documents.data, status=status.HTTP_200_OK)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteDocuments(request):
    document_ids = request.data.get('documentIds', [])
    if not document_ids:
        return Response({"error": "No document IDs provided."}, status=status.HTTP_400_BAD_REQUEST)

    documents = Document.objects.filter(id__in=document_ids, user=request.user)
    if not documents.exists():
        return Response({"error": "No documents found for the given IDs."}, status=status.HTTP_404_NOT_FOUND)

    documents.delete()
    return Response({"success": "Documents deleted successfully."}, status=status.HTTP_200_OK)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteAllDocuments(request):
    documents = Document.objects.filter(user=request.user)
    documents.delete()
    return Response({"success": "All documents deleted successfully."}, status=status.HTTP_200_OK)

