from rest_framework import routers
from .views import ComplaintViewSet

router = routers.DefaultRouter()
router.register(r'complaints', ComplaintViewSet)

urlpatterns = router.urls
