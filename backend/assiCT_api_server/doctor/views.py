from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from requests import Response

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes

from .serializer.serializer import UserRegisterSerializer, UserLoginSerializer, UserSerializer


# 회원가입
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny]) # 모든 사용자 접근가능
def signup(request):
    data = JSONParser().parse(request)
    serializer = UserRegisterSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors)


#로그인
@permission_classes([AllowAny])
class Login(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        if user['id'] == "None":
            return Response({"message": "fail"}, status=status.HTTP_401_UNAUTHORIZED)

        #response.set_cookie(key='jwt', value=UserSerializer.token, httponly=True, samesite='None')

        return Response(
            {
                "id": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data.get('id'),
                "token": user['token']
            }
        )


#로그아웃
#@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated]) #인증된 사용자만 접근 가능
def logout(request):
     if request.method == 'POST':
         response = JsonResponse({
             "message": "success"
         })
         response.delete_cookie('jwt')
         return response