from ..models.user import User

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings

User = get_user_model()

# JWT를 위한 설정
JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

#로그인
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=30)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password", None)

        # username과 password로 로그인
        user = authenticate(username=username, password=password)

        if user is None:
            return {'id': 'None', 'username': username}
        try:
            payload = JWT_PAYLOAD_HANDLER(user)  # payload 생성
            jwt_token = JWT_ENCODE_HANDLER(payload)  # jwt token 생성
            update_last_login(None, user)

        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given username and password does not exist'
            )
        return {
            'id': user.id,
            'token': jwt_token
        }

# 사용자 정보 추출
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',)





#회원가입
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['hospital', 'username', 'last_name', 'first_name', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
            # response에 password 제외
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        # password 암호화
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
