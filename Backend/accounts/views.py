from rest_framework import viewsets, generics
from .models import User
from .serializers import UserSerializer
from .permissions import IsAdminRole
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# -------------------------------
# User CRUD (Admin only)
# -------------------------------
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAdminRole]  # only role='ADMIN'

    def get_queryset(self):
        return User.objects.all()


# -------------------------------
# User Registration
# -------------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# -------------------------------
# User Profile (current logged-in user)
# -------------------------------
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
