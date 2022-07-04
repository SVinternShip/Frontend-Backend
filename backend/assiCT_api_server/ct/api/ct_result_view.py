from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.ctResult import CtResult
from ..serializer.serializer import CtResultSerializer


class CTResultList(APIView):

    def post(self, request):
        #ToDo: get url here
        serializer = CtResultSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            serializer.create(validated_data=request.data, original_url="test_url", lime_url="test_url")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CTResultDetail(APIView):

    def get_object(self, id):
        try:
            return CtResult.objects.get(pk=id)
        except CtResult.DoesNotExist:
            raise Http404

    def get(self, request, id):
        ct_result = self.get_object(id)
        serializer = CtResultSerializer(ct_result)
        return Response(serializer.data)

    def put(self, request, id):
        ct_result = self.get_object(id)
        serializer = CtResultSerializer(ct_result, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        ct_result = self.get_object(id)
        ct_result.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
