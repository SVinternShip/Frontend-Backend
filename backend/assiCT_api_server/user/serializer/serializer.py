from rest_framework import serializers
from ..models.user import User


class UserSerializer(serializers.ModelSerializer):
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
