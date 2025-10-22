from rest_framework import routers
from .views import LeaveViewSet

router = routers.DefaultRouter()
router.register(r'leaves', LeaveViewSet)

urlpatterns = router.urls
