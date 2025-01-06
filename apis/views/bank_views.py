from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from apis.serializers import BankAccountSerializer
from apis.models import BankAccount
from rest_framework.views import APIView

class BankAccountView(APIView): 
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        request.data['user'] = user.id
        serializer = BankAccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        bank_accounts = BankAccount.objects.filter(user=request.user)
        serializer = BankAccountSerializer(bank_accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

