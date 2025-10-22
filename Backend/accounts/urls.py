from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserViewSet, RegisterView, UserProfileView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='users')  # warden only

urlpatterns = [
    path('', include(router.urls)),                       # /users/ → warden only
    path('register/', RegisterView.as_view(), name='register'),   # /register/ → anyone
    path('profile/', UserProfileView.as_view(), name='user-profile'),  # /profile/ → logged-in user
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]