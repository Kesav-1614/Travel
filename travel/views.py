import json
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from .models import TravelRequest
from .serializers import UserSerializer, TravelRequestSerializer
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken

# ✅ Register User
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')
    email = request.data.get('email', '')
    is_staff = request.data.get('is_staff', False)
    is_active = request.data.get('is_active', True)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User(
        username=username,
        first_name=first_name,
        password=password,
        last_name=last_name,
        email=email,
        is_staff=is_staff,
        is_active=is_active
    ).save()

    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


# ✅ Login User and Return JWT Token
@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        if user.is_active:
            login(request, user)

            # ✅ Generate only access token (NO refresh token)
            access_token = str(AccessToken.for_user(user))

            print("Is staff:", user.is_staff)  # ✅ Debugging

            return Response({
                'access_token': access_token,
                'is_staff': user.is_staff
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User account is not active'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)




@csrf_exempt  # Remove if you are handling CSRF in your frontend
def submit_travel_request(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Parse the incoming JSON data

            # Create a new travel request entry
            travel_request = TravelRequest(
                project=data['project'],
                purpose=data['purpose'],
                start_date=data['startDate'],
                travel_mode=data['travelMode'],
                ticket_booking_mode=data['ticketBookingMode'],
                start_location=data['startLocation'],
                end_location=data['endLocation'],
            )
            travel_request.save()  # Save the data to the database

            return JsonResponse({'detail': 'Travel request submitted successfully.'}, status=200)
        
        except Exception as e:
            return JsonResponse({'detail': f'Error: {str(e)}'}, status=400)

    return JsonResponse({'detail': 'Invalid method'}, status=405)

class TravelRequestListView(generics.ListAPIView):
    serializer_class = TravelRequestSerializer
    permission_classes = [IsAuthenticated]  # ✅ Only authenticated users can access

    def get_queryset(self):
        return TravelRequest.objects.filter(user=self.request.user)
    
class TravelRequestDetail(generics.UpdateAPIView):
    queryset = TravelRequest.objects.all()
    serializer_class = TravelRequestSerializer
    
@api_view(['POST'])
def create_travel_request(request):
    serializer = TravelRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)  # ✅ Associate with logged-in user
        return Response({"detail": "Travel request submitted successfully."}, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def get_travel_requests(request):
    requests = TravelRequest.objects.all()
    serializer = TravelRequestSerializer(requests, many=True)
    return Response(serializer.data)

# AdminDashboard
# class UpdateTravelRequestView(APIView):
#     def patch(self, request, pk):
#         try:
#             travel_request = TravelRequest.objects.get(pk=pk)
#             travel_request.status = request.data.get('status')
#             travel_request.save()
#             return Response({'status': 'success'}, status=status.HTTP_200_OK)
#         except TravelRequest.DoesNotExist:
#             return Response({'error': 'Travel request not found'}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UpdateTravelRequestView(APIView):
    def patch(self, request, pk):
        try:
            travel_request = TravelRequest.objects.select_related('user').get(pk=pk)
            travel_request.status = request.data.get('status')
            travel_request.save()

            response_data = {
                'status': 'success',
                'id': travel_request.id,
                'project': travel_request.project,
                'purpose': travel_request.purpose,
                'start_date': travel_request.start_date,
                'travel_mode': travel_request.travel_mode,
                'ticket_booking_mode': travel_request.ticket_booking_mode,
                'start_location': travel_request.start_location,
                'end_location': travel_request.end_location,
                'status': travel_request.status,
                'username': travel_request.user.username if travel_request.user_id else None,
                'user_id': travel_request.user.id if travel_request.user_id else None
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except TravelRequest.DoesNotExist:
            return Response({'error': 'Travel request not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

