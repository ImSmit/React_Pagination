from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apis.models import User
from apis.serializers import UserSerializer, userSerializerWithToken, RegisterUserSerializer
from django.contrib.auth.hashers import make_password

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attr):
        data = super().validate(attr)
        serializer = userSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    serializer = RegisterUserSerializer(data=data)
    if serializer.is_valid():
        print(serializer.data)
        user = User.objects.create(
            first_name=serializer.validated_data['first_name'],
            last_name=serializer.validated_data['last_name'],
            username=serializer.validated_data['username'],
            email=serializer.validated_data['email'],
            password=make_password(serializer.validated_data['password'])
        )
        serializer = userSerializerWithToken(user, many=False)
        return Response(serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["put"])
@permission_classes([IsAuthenticated])
def updateUsers(request):
    user = request.user
    serializer = userSerializerWithToken(user, many=False)
    data = request.data
    user.first_name = data['first_name']
    user.username = data['email']
    user.email = data['email']

    if "password" in data:
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = userSerializerWithToken(user, many=False)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    user_data = User.objects.all()
    serializer = UserSerializer(user_data, many=True)

    return Response(serializer.data)

