from rest_framework import viewsets, generics
from .models import User
from .serializers import UserSerializer
from .permissions import IsWardenRole
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# -------------------------------
# User CRUD (Warden only)
# -------------------------------
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsWardenRole]  # only role='WARDEN'

    def get_queryset(self):
        return User.objects.all()


# -------------------------------
# User Registration
# -------------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # anyone can register


# -------------------------------
# User Profile (current logged-in user)
# -------------------------------
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
