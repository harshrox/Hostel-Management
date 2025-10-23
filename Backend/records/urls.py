from rest_framework import routers
from .views import StudentRecordViewSet

router = routers.DefaultRouter()
router.register(r'records', StudentRecordViewSet)

urlpatterns = router.urls
