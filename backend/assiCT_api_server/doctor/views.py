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
@permission_classes([AllowAny])  # 모든 사용자 접근가능
def signup(request):
    '''
        회원가입

        ___
        # 내용
            - 
    '''
    data = JSONParser().parse(request)
    serializer = UserRegisterSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    top_error_key = list(serializer.errors.keys())[0]
    top_error_code = serializer.errors.get(top_error_key)[0].code
    return Response(get_error_msg(top_error_key, top_error_code), status=status.HTTP_400_BAD_REQUEST)


def get_error_msg(key, code):
    if code is "unique":
        return "중복된 " + key + " 입니다."
    if code is "does_not_exist":
        return "존재하지 않는 " + key + " 입니다."
    if code is "blank":
        return key + " 값이 입력되지 않았습니다."
    return "잘못된 값 오류"


# 로그인
@permission_classes([AllowAny])
class Login(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        '''
            로그인

            ___
            # 내용
                - 
        '''
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        if user['id'] == "None":
            return Response({"message": "fail"}, status=status.HTTP_401_UNAUTHORIZED)

        # response.set_cookie(key='jwt', value=UserSerializer.token, httponly=True, samesite='None')

        return Response(
            {
                "id": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data.get('id'),
                "token": user['token']
            }
        )


# 로그아웃
# @csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # 인증된 사용자만 접근 가능
def logout(request):
    '''
        로그아웃

        ___
        # 내용
            - 
    '''

    if request.method == 'POST':
        response = JsonResponse({
            "message": "success"
        })
        response.delete_cookie('jwt')
        return response
