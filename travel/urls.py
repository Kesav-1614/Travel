from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    register,
    login_view,
    TravelRequestListView,
    create_travel_request, get_travel_requests, UpdateTravelRequestView,

    # logout_view
)
from travel import views

urlpatterns = [
    # ✅ User authentication endpoints
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    #  path('logout/', logout_view, name='logout'),

    # ✅ JWT token endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # ✅ Travel request endpoints
    path('submit-travel-request/', views.submit_travel_request, name='submit_travel_request'),
    path('travel-requests/', TravelRequestListView.as_view(), name='travel-request-list'),
     path('submit-travel-request/', create_travel_request, name='submit_travel_request'),
    path('get-travel-requests/', get_travel_requests, name='get_travel_requests'),
     path('update-travel-request/<int:pk>/', UpdateTravelRequestView.as_view(), name='update-travel-request'),
]
