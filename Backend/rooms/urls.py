from rest_framework import routers
from .views import RoomViewSet, AllocationViewSet

router = routers.DefaultRouter()
router.register(r'rooms', RoomViewSet)
router.register(r'allocations', AllocationViewSet)

urlpatterns = router.urls
