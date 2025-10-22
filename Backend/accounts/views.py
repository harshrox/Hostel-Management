from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

# JWT imports
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



# User CRUD (Admin only)
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]  # only admins

    def get_queryset(self):
        return User.objects.all()



# User Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


# User Profile (current logged-in user)
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
