from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from .models import Document, BankAccount


class UserSerializer(serializers.ModelSerializer):
    '''
        name: after get_ we can specify any variable name we want just need to use in field
    '''

    _id = serializers.SerializerMethodField(read_only=True)
    name = serializers.SerializerMethodField(read_only=True)
    full_name = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'full_name', 'is_admin']

    def get_name(self, obj):
        name = obj.first_name
        if not name:
            name = obj.email
        return name
    
    def get_full_name(self, obj):
        full_name = obj.first_name + " "+ obj.last_name
        if not full_name:
            full_name = obj.email
        return full_name
    
    def get__id(self, obj):
        _id = obj.id
        return _id
    
    def get_is_admin(self, obj):
        is_admin = obj.is_staff
        return is_admin

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value
    
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        
        return value

class userSerializerWithToken(UserSerializer):
    '''
    This class is inherited from above class to get token
    '''
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'full_name', 'date_joined','is_admin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    def get_date_joined(self, obj):
        date_joined = obj.date_joined
        return date_joined.strftime("%Y-%m-%d")


class RegisterDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'
    
    def validate_document(self, value):

        if value.name.split('.')[-1] not in ['pdf', 'docx', 'doc']:
            raise serializers.ValidationError("Only PDF, DOCX, and DOC files are allowed")
        
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("File size must be less than 5MB")
        
        return value

class DocumentSerializer(serializers.ModelSerializer):
    document = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Document
        fields = '__all__'

    def get_document(self, obj):
        return f"{settings.BASE_URL}{obj.document.url}"

class GetDocumentSerializer(serializers.ModelSerializer):
    document = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Document
        fields = '__all__'

    def get_document(self, obj):
        return f"{settings.BASE_URL}{obj.document.url}"
    
class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = '__all__'



